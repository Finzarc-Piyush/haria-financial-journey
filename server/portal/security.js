// The security primitives for the client portal, kept in one file so they can be reviewed in one sitting.
//
// Sessions are opaque random tokens in an httpOnly, Secure, SameSite=Strict cookie, stored hashed
// (SHA-256) in Mongo. A stolen database therefore holds no usable session. A JWT was rejected
// because it cannot be revoked: "sign out everywhere" and an advisor disabling an account must
// take effect on the next request, not when a token expires.
//
// The cookie is first-party because the browser talks to www.hariainvestments.com/api/v1/portal,
// which Vercel rewrites to the API project. A cookie set by the API's own vercel.app domain would
// be third-party and Safari drops those.
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { PortalSession, PortalUser, PortalRate, PortalAudit } = require("./models");

const COOKIE = "hi_portal";
const IDLE_MS = 30 * 60 * 1000;            // signed out after 30 minutes without activity
const ABSOLUTE_MS = 12 * 60 * 60 * 1000;   // and after 12 hours whatever happens
const MFA_WINDOW_MS = 5 * 60 * 1000;       // a password-only session has 5 minutes to give the code
const LOCK_AFTER = 5;
const LOCK_MS = 15 * 60 * 1000;
const BCRYPT_COST = 12;
const isProd = () => process.env.NODE_ENV === "production";

const sha256 = (s) => crypto.createHash("sha256").update(s).digest("hex");
const randomToken = (bytes = 32) => crypto.randomBytes(bytes).toString("base64url");

// ---- request facts -------------------------------------------------------------------------
const clientIp = (req) => String(req.headers["x-forwarded-for"] || req.ip || "").split(",")[0].trim();
const userAgent = (req) => String(req.headers["user-agent"] || "").slice(0, 300);

const parseCookies = (req) => {
    const out = {};
    for (const part of String(req.headers.cookie || "").split(";")) {
        const i = part.indexOf("=");
        if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
    }
    return out;
};

const setSessionCookie = (res, token, maxAgeMs) => {
    const bits = [`${COOKIE}=${token}`, "Path=/api/v1/portal", "HttpOnly", "SameSite=Strict", `Max-Age=${Math.floor(maxAgeMs / 1000)}`];
    if (isProd()) bits.push("Secure");
    res.append("Set-Cookie", bits.join("; "));
};
const clearSessionCookie = (res) => {
    res.append("Set-Cookie", `${COOKIE}=; Path=/api/v1/portal; HttpOnly; SameSite=Strict; Max-Age=0${isProd() ? "; Secure" : ""}`);
};

// ---- passwords -----------------------------------------------------------------------------
const COMMON = new Set(["password", "password1", "password123", "12345678", "123456789", "1234567890", "qwerty123",
    "iloveyou", "welcome123", "admin123", "letmein123", "haria123", "investment", "mutualfund"]);

const passwordProblem = (pw, email = "") => {
    if (typeof pw !== "string" || pw.length < 10) return "Use at least 10 characters.";
    if (pw.length > 128) return "Use at most 128 characters.";
    if (!/[a-z]/i.test(pw) || !/[0-9]/.test(pw)) return "Use letters and at least one number.";
    if (COMMON.has(pw.toLowerCase())) return "That password is too common. Choose another.";
    const local = String(email).split("@")[0].toLowerCase();
    if (local.length >= 4 && pw.toLowerCase().includes(local)) return "Don't use your email address in the password.";
    return null;
};
const hashPassword = (pw) => bcrypt.hash(pw, BCRYPT_COST);
const DUMMY_HASH = bcrypt.hashSync("not-a-real-password-0", BCRYPT_COST);
// Compares even when there is no such user, so the response time does not reveal which emails exist.
const checkPassword = (pw, hash) => bcrypt.compare(String(pw || ""), hash || DUMMY_HASH);

const tempPassword = () => {
    const words = ["Banyan", "Saffron", "Harbour", "Monsoon", "Teak", "Cobalt", "Amber", "Lotus", "Granite", "Coral"];
    const w = () => words[crypto.randomInt(words.length)];
    return `${w()}-${w()}-${crypto.randomInt(1000, 9999)}`;
};

// ---- field encryption (TOTP secrets) ------------------------------------------------------
const encKey = () => {
    const k = process.env.PORTAL_ENC_KEY;
    if (!k) throw new Error("PORTAL_ENC_KEY is not set");
    return crypto.createHash("sha256").update(k).digest();
};
const encrypt = (plain) => {
    const iv = crypto.randomBytes(12);
    const c = crypto.createCipheriv("aes-256-gcm", encKey(), iv);
    const body = Buffer.concat([c.update(plain, "utf8"), c.final()]);
    return [iv, c.getAuthTag(), body].map((b) => b.toString("base64url")).join(".");
};
const decrypt = (enc) => {
    const [iv, tag, body] = enc.split(".").map((s) => Buffer.from(s, "base64url"));
    const d = crypto.createDecipheriv("aes-256-gcm", encKey(), iv);
    d.setAuthTag(tag);
    return Buffer.concat([d.update(body), d.final()]).toString("utf8");
};

// ---- TOTP (RFC 6238), so any authenticator app works ---------------------------------------
const B32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
const base32 = (buf) => {
    let bits = 0, val = 0, out = "";
    for (const b of buf) { val = (val << 8) | b; bits += 8; while (bits >= 5) { out += B32[(val >>> (bits - 5)) & 31]; bits -= 5; } }
    if (bits > 0) out += B32[(val << (5 - bits)) & 31];
    return out;
};
const unbase32 = (s) => {
    let bits = 0, val = 0; const out = [];
    for (const ch of s.replace(/=+$/, "").toUpperCase()) {
        const i = B32.indexOf(ch); if (i < 0) continue;
        val = (val << 5) | i; bits += 5;
        if (bits >= 8) { out.push((val >>> (bits - 8)) & 255); bits -= 8; }
    }
    return Buffer.from(out);
};
const hotp = (secret, counter) => {
    const buf = Buffer.alloc(8); buf.writeBigUInt64BE(BigInt(counter));
    const h = crypto.createHmac("sha1", unbase32(secret)).update(buf).digest();
    const o = h[h.length - 1] & 15;
    return String(((h.readUInt32BE(o) & 0x7fffffff) % 1e6)).padStart(6, "0");
};
const newTotpSecret = () => base32(crypto.randomBytes(20));
const verifyTotp = (secret, code, now = Date.now()) => {
    const c = String(code || "").replace(/\s/g, "");
    if (!/^\d{6}$/.test(c)) return false;
    const step = Math.floor(now / 30000);
    return [-1, 0, 1].some((d) => crypto.timingSafeEqual(Buffer.from(hotp(secret, step + d)), Buffer.from(c)));
};

// ---- rate limits, in Mongo because serverless instances share no memory --------------------
const hit = async (key, windowMs) => {
    const now = new Date();
    const doc = await PortalRate.findOneAndUpdate(
        { key, expiresAt: { $gt: now } }, { $inc: { count: 1 } }, { new: true });
    if (doc) return doc.count;
    try {
        await PortalRate.findOneAndUpdate({ key }, { count: 1, expiresAt: new Date(now.getTime() + windowMs) }, { upsert: true });
    } catch (e) { if (e.code !== 11000) throw e; }
    return 1;
};
const limit = (name, max, windowMs) => async (req, res, next) => {
    const n = await hit(`${name}:${clientIp(req)}`, windowMs);
    if (n > max) {
        res.set("Retry-After", String(Math.ceil(windowMs / 1000)));
        return res.status(429).json({ success: false, message: "Too many attempts. Please wait a few minutes and try again." });
    }
    next();
};

// ---- audit ---------------------------------------------------------------------------------
const audit = (req, event, user, meta) =>
    PortalAudit.create({ user: user?._id, email: user?.email || meta?.email, event, ip: clientIp(req), ua: userAgent(req), meta })
        .catch(() => {});   // an audit write must never take the request down with it

// ---- sessions ------------------------------------------------------------------------------
const createSession = async (req, res, user, { mfaPending = false } = {}) => {
    const token = randomToken();
    const ttl = mfaPending ? MFA_WINDOW_MS : ABSOLUTE_MS;
    await PortalSession.create({
        tokenHash: sha256(token), user: user._id, mfaPending,
        expiresAt: new Date(Date.now() + ttl), ip: clientIp(req), ua: userAgent(req),
    });
    setSessionCookie(res, token, ttl);
    return token;
};

const loadSession = async (req) => {
    const token = parseCookies(req)[COOKIE];
    if (!token || token.length > 100) return null;
    const s = await PortalSession.findOne({ tokenHash: sha256(token) });
    if (!s) return null;
    const now = Date.now();
    if (s.expiresAt.getTime() <= now || (!s.mfaPending && now - s.lastSeenAt.getTime() > IDLE_MS)) {
        await s.deleteOne();
        return null;
    }
    const user = await PortalUser.findById(s.user);
    if (!user || user.disabled) { await s.deleteOne(); return null; }
    // a password change ends every session that began before it
    if (user.passwordChangedAt && s.createdAt < user.passwordChangedAt && !s.mfaPending) {
        await s.deleteOne();
        return null;
    }
    return { session: s, user };
};

// Every portal request: no caching anywhere, and a write must come from our own pages.
const guard = (req, res, next) => {
    res.set("Cache-Control", "no-store");
    res.set("Pragma", "no-cache");
    res.set("X-Robots-Tag", "noindex");
    if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        // A cross-site form cannot set a custom header, and SameSite=Strict already withholds the
        // cookie; this is the second lock on the same door.
        if (req.headers["x-portal"] !== "1") return res.status(403).json({ success: false, message: "Forbidden" });
        const origin = req.headers.origin;
        const allowed = (process.env.PORTAL_ORIGINS || "https://www.hariainvestments.com,https://hariainvestments.com,http://localhost:8080,http://localhost:5173")
            .split(",").map((s) => s.trim());
        if (origin && !allowed.includes(origin)) return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
};

const requireUser = ({ allowPasswordChange = false, allowMfaPending = false } = {}) => async (req, res, next) => {
    const got = await loadSession(req);
    if (!got) { clearSessionCookie(res); return res.status(401).json({ success: false, message: "Please sign in." }); }
    if (got.session.mfaPending && !allowMfaPending) return res.status(401).json({ success: false, message: "Enter your authenticator code.", mfa: true });
    if (got.user.mustChangePassword && !allowPasswordChange) return res.status(403).json({ success: false, message: "Set a new password first.", mustChangePassword: true });
    if (!got.session.mfaPending) {
        // touch at most once a minute, so reads stay cheap
        if (Date.now() - got.session.lastSeenAt.getTime() > 60 * 1000) {
            got.session.lastSeenAt = new Date();
            await got.session.save();
        }
    }
    req.portal = got;
    next();
};

const requireAdvisor = (req, res, next) =>
    req.portal?.user.role === "advisor" ? next() : res.status(403).json({ success: false, message: "Advisors only." });

module.exports = {
    COOKIE, LOCK_AFTER, LOCK_MS, IDLE_MS, ABSOLUTE_MS,
    sha256, randomToken, clientIp, userAgent, parseCookies,
    setSessionCookie, clearSessionCookie,
    passwordProblem, hashPassword, checkPassword, tempPassword,
    encrypt, decrypt, newTotpSecret, verifyTotp, hotp,
    limit, hit, audit, createSession, loadSession, guard, requireUser, requireAdvisor,
};
