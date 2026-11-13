// /api/v1/portal: the Haria Investments client portal.
//   Clients sign in at www.hariainvestments.com/userdashboard and see only their own portfolio.
//   The admin signs in at /admindash and sees every client.
// The rules of the door are in security.js; this file is what lies behind it.
const { Router } = require("express");
const validator = require("validator");
const S = require("./security");
const { PortalUser, PortalSession, PortalHolding, PortalTxn, PortalAudit, PortalReset } = require("./models");
const { transporter } = require("../config/mailer");
const config = require("../config/config");
const logger = require("../config/logger");

const r = Router();
r.use(S.guard);

const GENERIC = "That email and password don't match. Check them and try again.";
const publicUser = (u) => ({
    id: u._id, name: u.name, email: u.email, role: u.role, clientCode: u.clientCode, panMasked: u.panMasked,
    phone: u.phone, city: u.city, riskProfile: u.riskProfile, totpEnabled: u.totpEnabled,
    mustChangePassword: u.mustChangePassword, lastLoginAt: u.lastLoginAt,
});

// ---------------------------------------------------------------------------------------------
// Sign in, second factor, sign out
// ---------------------------------------------------------------------------------------------
r.post("/auth/login", S.limit("login", 20, 15 * 60 * 1000), async (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const password = String(req.body?.password || "");
    const area = req.body?.area === "admin" ? "admin" : "client";
    const user = validator.isEmail(email) ? await PortalUser.findOne({ email }) : null;

    if (user?.lockUntil && user.lockUntil > new Date()) {
        await S.checkPassword(password, null);
        S.audit(req, "login_locked", user);
        return res.status(423).json({ success: false, message: "This account is paused for 15 minutes after several wrong attempts. Try again shortly, or reset your password." });
    }
    const ok = await S.checkPassword(password, user?.passwordHash);
    if (!user || !ok || user.disabled) {
        if (user && !user.disabled) {
            user.failedLogins += 1;
            if (user.failedLogins >= S.LOCK_AFTER) { user.lockUntil = new Date(Date.now() + S.LOCK_MS); user.failedLogins = 0; }
            await user.save();
        }
        S.audit(req, "login_failed", user, { email });
        return res.status(401).json({ success: false, message: GENERIC });
    }
    // each door admits its own role only, so a client password never opens the admin view
    if ((area === "admin") !== (user.role === "advisor")) {
        S.audit(req, "login_wrong_area", user, { area });
        return res.status(401).json({ success: false, message: area === "admin" ? GENERIC : "This sign-in is for clients. Advisors sign in at /admindash." });
    }
    user.failedLogins = 0; user.lockUntil = undefined;
    await user.save();

    if (user.totpEnabled) {
        await S.createSession(req, res, user, { mfaPending: true });
        S.audit(req, "login_password_ok", user);
        return res.json({ success: true, mfa: true });
    }
    user.lastLoginAt = new Date(); await user.save();
    await S.createSession(req, res, user);
    S.audit(req, "login", user);
    res.json({ success: true, user: publicUser(user) });
});

r.post("/auth/mfa", S.limit("mfa", 10, 5 * 60 * 1000), S.requireUser({ allowMfaPending: true, allowPasswordChange: true }), async (req, res) => {
    const { session, user } = req.portal;
    if (!session.mfaPending) return res.json({ success: true, user: publicUser(user) });
    if (!user.totpSecretEnc || !S.verifyTotp(S.decrypt(user.totpSecretEnc), req.body?.code)) {
        S.audit(req, "mfa_failed", user);
        return res.status(401).json({ success: false, message: "That code didn't match. Use the newest 6-digit code from your authenticator app." });
    }
    await session.deleteOne();                     // swap the half-session for a full one
    user.lastLoginAt = new Date(); await user.save();
    await S.createSession(req, res, user);
    S.audit(req, "login", user, { mfa: true });
    res.json({ success: true, user: publicUser(user) });
});

r.post("/auth/logout", async (req, res) => {
    const token = S.parseCookies(req)[S.COOKIE];
    if (token) await PortalSession.deleteOne({ tokenHash: S.sha256(token) });
    S.clearSessionCookie(res);
    res.json({ success: true });
});

r.get("/me", S.requireUser({ allowPasswordChange: true }), (req, res) =>
    res.json({ success: true, user: publicUser(req.portal.user) }));

// ---------------------------------------------------------------------------------------------
// Passwords
// ---------------------------------------------------------------------------------------------
r.post("/auth/change-password", S.limit("chpw", 10, 15 * 60 * 1000), S.requireUser({ allowPasswordChange: true }), async (req, res) => {
    const { user, session } = req.portal;
    const { current, next } = req.body || {};
    if (!(await S.checkPassword(current, user.passwordHash))) return res.status(400).json({ success: false, message: "Your current password is not right." });
    const problem = S.passwordProblem(next, user.email);
    if (problem) return res.status(400).json({ success: false, message: problem });
    if (await S.checkPassword(next, user.passwordHash)) return res.status(400).json({ success: false, message: "Choose a password you haven't used here." });
    user.passwordHash = await S.hashPassword(next);
    user.passwordChangedAt = new Date();
    user.mustChangePassword = false;
    await user.save();
    await PortalSession.deleteMany({ user: user._id });     // every other device is signed out
    await session.deleteOne().catch(() => {});
    await S.createSession(req, res, user);
    S.audit(req, "password_changed", user);
    res.json({ success: true, user: publicUser(user) });
});

r.post("/auth/forgot", S.limit("forgot", 5, 60 * 60 * 1000), async (req, res) => {
    const email = String(req.body?.email || "").trim().toLowerCase();
    const done = () => res.json({ success: true, message: "If that email has an account, a reset link is on its way. It works for 30 minutes." });
    if (!validator.isEmail(email)) return done();
    const user = await PortalUser.findOne({ email, disabled: false });
    if (!user) { S.audit(req, "forgot_unknown", null, { email }); return done(); }
    const token = S.randomToken();
    await PortalReset.deleteMany({ user: user._id });
    await PortalReset.create({ tokenHash: S.sha256(token), user: user._id, expiresAt: new Date(Date.now() + 30 * 60 * 1000) });
    const base = process.env.PORTAL_PUBLIC_URL || "https://www.hariainvestments.com";
    const link = `${base}/${user.role === "advisor" ? "admindash" : "userdashboard"}/reset?token=${token}`;
    S.audit(req, "forgot_sent", user);
    // demo accounts live on example.com, which takes no mail
    if (!/@example\.(com|org)$/.test(user.email)) {
        transporter.sendMail({
            from: `"Haria Investments" <${config.smtp_user}>`,
            to: user.email,
            subject: "Reset your Haria Investments password",
            html: `<div style="font-family:Georgia,serif;max-width:520px;margin:auto;color:#1a2238">
              <p style="letter-spacing:2px;color:#9a7b3c;font-size:12px;text-transform:uppercase">Haria Investments</p>
              <h2 style="font-weight:normal">Reset your password</h2>
              <p>Someone asked to reset the password for ${user.email}. If it was you, use the button below within 30 minutes.</p>
              <p><a href="${link}" style="display:inline-block;background:#1a2238;color:#fff;padding:12px 22px;text-decoration:none;border-radius:6px">Choose a new password</a></p>
              <p style="color:#666;font-size:13px">If you didn't ask for this, you can ignore this email. Your password stays the same.</p></div>`,
        }).catch((e) => logger.error(`portal reset mail failed: ${e.message}`));
    } else if (process.env.NODE_ENV !== "production") {
        logger.info(`[portal] reset link for demo account ${user.email}: ${link}`);
    }
    done();
});

r.post("/auth/reset", S.limit("reset", 10, 15 * 60 * 1000), async (req, res) => {
    const token = String(req.body?.token || "");
    const rec = token ? await PortalReset.findOne({ tokenHash: S.sha256(token), expiresAt: { $gt: new Date() } }) : null;
    if (!rec) return res.status(400).json({ success: false, message: "This link has expired or was already used. Ask for a new one." });
    const user = await PortalUser.findById(rec.user);
    const problem = S.passwordProblem(req.body?.password, user?.email);
    if (problem) return res.status(400).json({ success: false, message: problem });
    user.passwordHash = await S.hashPassword(req.body.password);
    user.passwordChangedAt = new Date();
    user.mustChangePassword = false;
    user.failedLogins = 0; user.lockUntil = undefined;
    await user.save();
    await PortalReset.deleteMany({ user: user._id });
    await PortalSession.deleteMany({ user: user._id });
    S.audit(req, "password_reset", user);
    res.json({ success: true, message: "Password changed. Sign in with your new password." });
});

// ---------------------------------------------------------------------------------------------
// Two-step sign-in (authenticator app)
// ---------------------------------------------------------------------------------------------
r.post("/security/totp/start", S.requireUser(), async (req, res) => {
    const { user } = req.portal;
    const secret = S.newTotpSecret();
    user.totpPendingEnc = S.encrypt(secret); await user.save();
    const label = encodeURIComponent(`Haria Investments:${user.email}`);
    res.json({ success: true, secret, uri: `otpauth://totp/${label}?secret=${secret}&issuer=${encodeURIComponent("Haria Investments")}&digits=6&period=30` });
});
r.post("/security/totp/confirm", S.limit("totpc", 10, 15 * 60 * 1000), S.requireUser(), async (req, res) => {
    const { user } = req.portal;
    if (!user.totpPendingEnc || !S.verifyTotp(S.decrypt(user.totpPendingEnc), req.body?.code))
        return res.status(400).json({ success: false, message: "That code didn't match. Check the time on your phone and try the newest code." });
    user.totpSecretEnc = user.totpPendingEnc; user.totpPendingEnc = undefined; user.totpEnabled = true;
    await user.save();
    S.audit(req, "totp_enabled", user);
    res.json({ success: true, user: publicUser(user) });
});
r.post("/security/totp/disable", S.requireUser(), async (req, res) => {
    const { user } = req.portal;
    if (!(await S.checkPassword(req.body?.password, user.passwordHash))) return res.status(400).json({ success: false, message: "Your password is not right." });
    user.totpEnabled = false; user.totpSecretEnc = undefined; user.totpPendingEnc = undefined;
    await user.save();
    S.audit(req, "totp_disabled", user);
    res.json({ success: true, user: publicUser(user) });
});

r.get("/security/sessions", S.requireUser(), async (req, res) => {
    const { user, session } = req.portal;
    const list = await PortalSession.find({ user: user._id, mfaPending: false }).sort({ lastSeenAt: -1 }).lean();
    const events = await PortalAudit.find({ user: user._id }).sort({ at: -1 }).limit(12).lean();
    res.json({
        success: true,
        sessions: list.map((s) => ({ id: s._id, current: String(s._id) === String(session._id), ip: s.ip, ua: s.ua, lastSeenAt: s.lastSeenAt, createdAt: s.createdAt })),
        activity: events.map((e) => ({ event: e.event, at: e.at, ip: e.ip, ua: e.ua })),
    });
});
r.post("/security/sessions/revoke-others", S.requireUser(), async (req, res) => {
    const { user, session } = req.portal;
    const { deletedCount } = await PortalSession.deleteMany({ user: user._id, _id: { $ne: session._id } });
    S.audit(req, "sessions_revoked", user, { count: deletedCount });
    res.json({ success: true, revoked: deletedCount });
});

// ---------------------------------------------------------------------------------------------
// The portfolio. A client can only ever ask for their own; the id comes from the session.
// ---------------------------------------------------------------------------------------------
const portfolioOf = async (userId) => {
    const [holdings, txns] = await Promise.all([
        PortalHolding.find({ user: userId }).sort({ value: -1 }).lean(),
        PortalTxn.find({ user: userId }).sort({ date: -1 }).limit(60).lean(),
    ]);
    const sum = (k) => holdings.reduce((a, h) => a + (Number(h[k]) || 0), 0);
    const invested = sum("invested"), value = sum("value");
    const asOf = holdings.reduce((m, h) => (h.asOf && (!m || h.asOf > m) ? h.asOf : m), null);
    return {
        asOf,
        totals: {
            invested, value, gain: value - invested, gainPct: invested ? ((value - invested) / invested) * 100 : 0,
            dayChange: sum("dayChange"), realised: sum("realised"),
            monthlySip: holdings.reduce((a, h) => a + (h.sipAmount || 0), 0),
            // value-weighted XIRR across schemes; the back office's portfolio XIRR replaces this once wired
            xirr: value ? holdings.reduce((a, h) => a + (h.xirr || 0) * (h.value || 0), 0) / value : null,
            count: holdings.length,
        },
        holdings: holdings.map(({ user, __v, ...h }) => h),
        transactions: txns.map(({ user, __v, ...t }) => t),
    };
};

r.get("/portfolio", S.requireUser(), async (req, res) => {
    const { user } = req.portal;
    if (user.role !== "client") return res.status(403).json({ success: false, message: "Clients only." });
    S.audit(req, "portfolio_viewed", user);
    res.json({ success: true, ...(await portfolioOf(user._id)) });
});

// ---------------------------------------------------------------------------------------------
// Admin (/admindash): every client
// ---------------------------------------------------------------------------------------------
const admin = [S.requireUser(), S.requireAdvisor];

r.get("/admin/clients", ...admin, async (req, res) => {
    const clients = await PortalUser.find({ role: "client" }).sort({ name: 1 }).lean();
    const agg = await PortalHolding.aggregate([
        { $group: { _id: "$user", invested: { $sum: "$invested" }, value: { $sum: "$value" }, sip: { $sum: "$sipAmount" }, schemes: { $sum: 1 }, asOf: { $max: "$asOf" } } },
    ]);
    const by = Object.fromEntries(agg.map((a) => [String(a._id), a]));
    res.json({
        success: true,
        clients: clients.map((c) => {
            const a = by[String(c._id)] || {};
            return { ...publicUser(c), disabled: c.disabled, invested: a.invested || 0, value: a.value || 0, sip: a.sip || 0, schemes: a.schemes || 0, asOf: a.asOf || null };
        }),
    });
});

r.get("/admin/clients/:id", ...admin, async (req, res) => {
    if (!/^[a-f0-9]{24}$/.test(req.params.id)) return res.status(404).json({ success: false, message: "Not found" });
    const c = await PortalUser.findOne({ _id: req.params.id, role: "client" });
    if (!c) return res.status(404).json({ success: false, message: "Not found" });
    S.audit(req, "admin_viewed_client", req.portal.user, { client: String(c._id) });
    res.json({ success: true, client: { ...publicUser(c), disabled: c.disabled }, ...(await portfolioOf(c._id)) });
});

r.post("/admin/clients", ...admin, async (req, res) => {
    const b = req.body || {};
    const email = String(b.email || "").trim().toLowerCase();
    if (!validator.isEmail(email)) return res.status(400).json({ success: false, message: "Enter a valid email." });
    if (!String(b.name || "").trim()) return res.status(400).json({ success: false, message: "Enter the client's name." });
    if (await PortalUser.exists({ email })) return res.status(409).json({ success: false, message: "A client with that email already exists." });
    const pan = String(b.pan || "").toUpperCase().replace(/\s/g, "");
    if (pan && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan)) return res.status(400).json({ success: false, message: "That PAN doesn't look right (ABCDE1234F)." });
    const temp = S.tempPassword();
    const c = await PortalUser.create({
        email, name: String(b.name).trim(), clientCode: b.clientCode, phone: b.phone, city: b.city,
        panMasked: pan ? `${pan.slice(0, 5)}****${pan.slice(9)}` : undefined,    // the full PAN is never stored
        passwordHash: await S.hashPassword(temp), mustChangePassword: true,
    });
    S.audit(req, "admin_created_client", req.portal.user, { client: String(c._id) });
    // shown once to the admin, who hands it over; it must be changed at first sign-in
    res.status(201).json({ success: true, client: publicUser(c), tempPassword: temp });
});

r.post("/admin/clients/:id/reset-password", ...admin, async (req, res) => {
    const c = await PortalUser.findOne({ _id: req.params.id, role: "client" });
    if (!c) return res.status(404).json({ success: false, message: "Not found" });
    const temp = S.tempPassword();
    c.passwordHash = await S.hashPassword(temp); c.mustChangePassword = true; c.passwordChangedAt = new Date();
    c.failedLogins = 0; c.lockUntil = undefined;
    await c.save();
    await PortalSession.deleteMany({ user: c._id });
    S.audit(req, "admin_reset_client_password", req.portal.user, { client: String(c._id) });
    res.json({ success: true, tempPassword: temp });
});

r.post("/admin/clients/:id/disable", ...admin, async (req, res) => {
    const c = await PortalUser.findOne({ _id: req.params.id, role: "client" });
    if (!c) return res.status(404).json({ success: false, message: "Not found" });
    c.disabled = !!req.body?.disabled; await c.save();
    if (c.disabled) await PortalSession.deleteMany({ user: c._id });
    S.audit(req, c.disabled ? "admin_disabled_client" : "admin_enabled_client", req.portal.user, { client: String(c._id) });
    res.json({ success: true, disabled: c.disabled });
});

// Holdings arrive as rows in the shape of the back office's "Portfolio Valuation Report By Security".
// Replaces the client's holdings wholesale: the report is a snapshot, not a stream of changes.
r.post("/admin/clients/:id/holdings", ...admin, async (req, res) => {
    const c = await PortalUser.findOne({ _id: req.params.id, role: "client" });
    if (!c) return res.status(404).json({ success: false, message: "Not found" });
    const rows = Array.isArray(req.body?.rows) ? req.body.rows.slice(0, 500) : [];
    const num = (v) => { const n = Number(String(v ?? "").replace(/[,₹\s]/g, "")); return Number.isFinite(n) ? n : 0; };
    const asOf = req.body?.asOf ? new Date(req.body.asOf) : new Date();
    const docs = rows.filter((x) => x && String(x.name || "").trim()).map((x) => ({
        user: c._id, assetClass: x.assetClass || "Mutual Fund", name: String(x.name).trim().slice(0, 200),
        isin: x.isin, folio: x.folio, category: x.category, amc: x.amc,
        invested: num(x.invested), units: num(x.units), avgNav: num(x.avgNav), nav: num(x.nav), value: num(x.value),
        dayChange: num(x.dayChange), sipAmount: num(x.sipAmount), xirr: num(x.xirr), realised: num(x.realised), asOf,
    }));
    if (!docs.length) return res.status(400).json({ success: false, message: "No rows with a scheme name were found." });
    await PortalHolding.deleteMany({ user: c._id });
    await PortalHolding.insertMany(docs);
    S.audit(req, "admin_imported_holdings", req.portal.user, { client: String(c._id), rows: docs.length });
    res.json({ success: true, imported: docs.length });
});

r.get("/admin/audit", ...admin, async (req, res) => {
    const events = await PortalAudit.find().sort({ at: -1 }).limit(100).lean();
    res.json({ success: true, events: events.map((e) => ({ event: e.event, email: e.email, at: e.at, ip: e.ip })) });
});

module.exports = r;
