// Weekly website summary for Haria Investments, mailed every Monday morning (IST).
//
// Asked for on 2026-11-12: the cookie analytics were being captured but only visible behind the
// /dashboard login, which nobody opened. This sends the last seven days to ADMIN_EMAIL (cc
// ADMIN_CC_EMAIL) so the data is read without anyone having to go and look.
//
// Triggered by Vercel Cron (vercel.json), which calls GET /api/v1/reports/weekly with
// "Authorization: Bearer $CRON_SECRET". Any other caller gets 401. ?dry=1 returns the numbers
// and the HTML without sending, for checking.

const Analytics = require("../models/analyticsModel");
const Contact = require("../models/contactModel");
const FinancialHealth = require("../models/financialHealthModel");
const config = require("../config/config");
const logger = require("../config/logger");
const { transporter } = require("../config/mailer");

const DAY = 24 * 60 * 60 * 1000;
const IST = "Asia/Kolkata";

const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: IST });
const fmtMinutes = (ms) => {
    const s = Math.round(ms / 1000);
    return s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pathOf = (url) => {
    try { return new URL(url).pathname || "/"; } catch { return url || "/"; }
};
const PAGE_NAMES = {
    "/": "Home", "/contact": "Contact", "/financial-health-form": "Financial Health Form",
    "/mutual-funds": "Mutual Funds", "/equity-investment": "Equity", "/fixed-income": "Fixed Income",
    "/life-insurance": "Life Insurance", "/general-insurance": "General Insurance",
    "/commodity-trading": "Commodity Trading", "/gold-silver": "Gold & Silver",
    "/other-derivatives": "Other Derivatives", "/wealth-management": "Wealth Management",
    "/insurance-protection": "Insurance & Protection", "/sip-calculator": "SIP Calculator",
    "/swp-calculator": "SWP Calculator", "/lumpsum-calculator": "Lumpsum Calculator",
    "/cagr-calculator": "CAGR Calculator",
};
const sourceOf = (ref) => {
    if (!ref) return "Direct or app";
    try {
        const h = new URL(ref).hostname.replace(/^www\./, "");
        if (h.endsWith("hariainvestments.com")) return null;   // moving between pages, not a source
        if (/google\./.test(h)) return "Google";
        if (/instagram|facebook|fb\.|l\.facebook/.test(h)) return "Instagram / Facebook";
        if (/linkedin|lnkd/.test(h)) return "LinkedIn";
        if (/whatsapp|wa\.me/.test(h)) return "WhatsApp";
        return h;
    } catch { return "Other"; }
};

async function buildReport(now = new Date()) {
    const to = now;
    const from = new Date(now.getTime() - 7 * DAY);
    const prevFrom = new Date(from.getTime() - 7 * DAY);

    const [events, prevViews, contacts, forms] = await Promise.all([
        Analytics.find({ timestamp: { $gte: from, $lt: to } }).lean(),
        Analytics.countDocuments({ eventType: "pageview", timestamp: { $gte: prevFrom, $lt: from } }),
        Contact.find({ createdAt: { $gte: from, $lt: to } }).sort({ createdAt: 1 }).lean(),
        FinancialHealth.find({ createdAt: { $gte: from, $lt: to } }).sort({ createdAt: 1 }).lean(),
    ]);

    const views = events.filter((e) => e.eventType === "pageview");
    const visitors = new Set(events.map((e) => e.visitorId));
    const sessions = new Set(events.map((e) => e.sessionId).filter(Boolean));
    const newVisitors = new Set(views.filter((e) => e.isNewVisitor).map((e) => e.visitorId));

    // time on site: the longest timeSpent seen per session, summed
    const perSession = {};
    for (const e of events) {
        if (!e.sessionId) continue;
        perSession[e.sessionId] = Math.max(perSession[e.sessionId] || 0, e.timeSpent || 0);
    }
    const times = Object.values(perSession).filter((t) => t > 0);
    const avgTime = times.length ? times.reduce((a, b) => a + b, 0) / times.length : 0;

    const count = (arr, key) => {
        const m = {};
        for (const x of arr) { const k = key(x); if (k) m[k] = (m[k] || 0) + 1; }
        return Object.entries(m).sort((a, b) => b[1] - a[1]);
    };
    const topPages = count(views, (e) => PAGE_NAMES[pathOf(e.pageUrl)] || pathOf(e.pageUrl)).slice(0, 6);
    const sources = count(views, (e) => sourceOf(e.referrer)).slice(0, 5);
    const devices = count(views, (e) => e.deviceInfo?.device || "desktop");

    return {
        from, to,
        pageviews: views.length, prevPageviews: prevViews,
        visitors: visitors.size, newVisitors: newVisitors.size, sessions: sessions.size,
        avgTime, topPages, sources, devices,
        contacts: contacts.map((c) => ({ name: `${c.firstName} ${c.lastName}`, email: c.email, services: (c.services || []).join(", "), message: c.message, at: c.createdAt })),
        forms: forms.map((f) => ({ name: `${f.firstName} ${f.lastName}`, email: f.email, phone: f.phone, at: f.createdAt })),
    };
}

function renderHtml(r) {
    const range = `${fmtDate(r.from)} to ${fmtDate(new Date(r.to.getTime() - 1))}`;
    const delta = r.prevPageviews ? Math.round(((r.pageviews - r.prevPageviews) / r.prevPageviews) * 100) : null;
    const deltaText = delta === null ? "" : ` (${delta >= 0 ? "+" : ""}${delta}% on the week before)`;
    const rows = (list) => list.length
        ? list.map(([k, v]) => `<tr><td style="padding:6px 0;border-bottom:1px solid #eee">${esc(k)}</td><td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right">${v}</td></tr>`).join("")
        : `<tr><td style="padding:6px 0;color:#888">None this week</td><td></td></tr>`;
    const leads = [
        ...r.contacts.map((c) => `<li style="margin-bottom:8px"><b>${esc(c.name)}</b>, ${esc(c.email)}<br><span style="color:#555">Contact form · ${esc(c.services)}${c.message ? ` · "${esc(c.message.slice(0, 160))}"` : ""}</span></li>`),
        ...r.forms.map((f) => `<li style="margin-bottom:8px"><b>${esc(f.name)}</b>, ${esc(f.email)}${f.phone ? `, ${esc(f.phone)}` : ""}<br><span style="color:#555">Financial Health Form</span></li>`),
    ];
    const stat = (n, label) => `<td style="padding:12px;text-align:center;background:#f6f3ec;border-radius:8px"><div style="font-size:24px;font-weight:bold;color:#0c2340">${n}</div><div style="font-size:12px;color:#555">${label}</div></td>`;

    return `<!doctype html><html><body style="margin:0;background:#ffffff;font-family:Georgia,'Times New Roman',serif;color:#222">
<div style="max-width:560px;margin:0 auto;padding:24px">
  <div style="font-size:13px;letter-spacing:1px;color:#b08d3c;text-transform:uppercase">Haria Investments · Website this week</div>
  <h1 style="font-size:22px;color:#0c2340;margin:6px 0 4px">${range}</h1>
  <p style="margin:0 0 18px;color:#555;font-size:14px">${r.pageviews} page views from ${r.visitors} visitors${deltaText}. Counts only visitors who accepted the cookie banner.</p>
  <table role="presentation" width="100%" cellspacing="6" style="border-collapse:separate"><tr>
    ${stat(r.visitors, "Visitors")}${stat(r.newVisitors, "New visitors")}${stat(r.sessions, "Visits")}${stat(fmtMinutes(r.avgTime), "Avg. time per visit")}
  </tr></table>
  <h2 style="font-size:16px;color:#0c2340;margin:22px 0 8px">Enquiries (${leads.length})</h2>
  ${leads.length ? `<ul style="padding-left:18px;margin:0;font-size:14px">${leads.join("")}</ul>` : `<p style="margin:0;color:#888;font-size:14px">No forms were submitted this week.</p>`}
  <h2 style="font-size:16px;color:#0c2340;margin:22px 0 4px">Most viewed pages</h2>
  <table width="100%" style="font-size:14px;border-collapse:collapse">${rows(r.topPages)}</table>
  <h2 style="font-size:16px;color:#0c2340;margin:22px 0 4px">Where visitors came from</h2>
  <table width="100%" style="font-size:14px;border-collapse:collapse">${rows(r.sources)}</table>
  <h2 style="font-size:16px;color:#0c2340;margin:22px 0 4px">Devices</h2>
  <table width="100%" style="font-size:14px;border-collapse:collapse">${rows(r.devices)}</table>
  <p style="margin:26px 0 0;font-size:12px;color:#888">Sent every Monday by your website. Full detail is on the dashboard at hariainvestments.com/dashboard.</p>
</div></body></html>`;
}

const weeklyReport = async (req, res) => {
    const secret = process.env.CRON_SECRET;
    if (!secret || req.headers.authorization !== `Bearer ${secret}`) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    try {
        const r = await buildReport();
        const html = renderHtml(r);
        if (req.query.dry) {
            return res.json({ success: true, dry: true, report: r, html });
        }
        const to = process.env.REPORT_TO || config.admin_email;
        const cc = process.env.REPORT_TO ? undefined : config.admin_cc_email;
        await transporter.sendMail({
            from: `"Haria Investments Website" <${config.smtp_user}>`,
            to, cc,
            subject: `Website this week: ${r.visitors} visitors, ${r.contacts.length + r.forms.length} enquiries`,
            html,
        });
        logger.info(`Weekly report sent to ${to}: ${r.pageviews} views, ${r.visitors} visitors`);
        res.json({ success: true, sent: to, pageviews: r.pageviews, visitors: r.visitors });
    } catch (error) {
        logger.error("Weekly report failed:", error);
        res.status(500).json({ success: false, message: "Weekly report failed" });
    }
};

module.exports = { weeklyReport, buildReport, renderHtml };
