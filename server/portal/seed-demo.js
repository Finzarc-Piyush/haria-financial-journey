// Seeds the portal with FICTIONAL clients for testing. No real client, PAN or holding appears here.
// Scheme names and ISINs are public fund identifiers; every amount is invented.
//   node portal/seed-demo.js            create or refresh the demo accounts
//   node portal/seed-demo.js --remove   delete every demo account and its data
// Passwords are generated per run and written to portal/DEMO-ACCOUNTS.local.md (gitignored).
require("dotenv").config({ path: require("path").join(__dirname, "..", ".env"), quiet: true });
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const S = require("./security");
const { PortalUser, PortalHolding, PortalTxn, PortalSession, PortalAudit } = require("./models");

const DEMO = /@example\.com$/;
const day = (d) => new Date(Date.UTC(2026, 10, d));

const FUNDS = {
    dsp: { name: "DSP Multi Asset Allocation Fund Reg-G", isin: "INF740KA1TB5", category: "Multi Asset", amc: "DSP", nav: 16.17 },
    icici: { name: "ICICI Prudential Value Fund Reg-G", isin: "INF109K01AF8", category: "Value", amc: "ICICI Prudential", nav: 477.29 },
    kotak: { name: "Kotak Multicap Fund Reg-G", isin: "INF174KA1HS9", category: "Multi Cap", amc: "Kotak", nav: 20.66 },
    mirae: { name: "Mirae Asset Gold Silver Passive FoF Reg-G", isin: "INF769K01PP6", category: "Gold & Silver", amc: "Mirae Asset", nav: 14.21 },
    nippon: { name: "Nippon India Growth Mid Cap Fund Reg-G", isin: "INF204K01323", category: "Mid Cap", amc: "Nippon India", nav: 4471.6 },
    parag: { name: "Parag Parikh Flexi Cap Fund Reg-G", isin: "INF879O01027", category: "Flexi Cap", amc: "PPFAS", nav: 88.4 },
    hdfcbal: { name: "HDFC Balanced Advantage Fund Reg-G", isin: "INF179K01830", category: "Balanced Advantage", amc: "HDFC", nav: 512.3 },
    sbiliq: { name: "SBI Liquid Fund Reg-G", isin: "INF200K01MA1", category: "Liquid", amc: "SBI", nav: 4120.5 },
    axissmall: { name: "Axis Small Cap Fund Reg-G", isin: "INF846K01K35", category: "Small Cap", amc: "Axis", nav: 112.7 },
};

// [fund, invested, gain %, monthly SIP, xirr]
const PEOPLE = [
    { email: "ananya.mehta@example.com", name: "Ananya Mehta", clientCode: "DEMO1001", panMasked: "ABCPM****K", city: "Mumbai", phone: "+91 90000 00001", riskProfile: "Moderately aggressive",
      book: [["dsp", 48000, 3.1, 4000, 9.2], ["icici", 48000, 2.4, 4000, 6.8], ["kotak", 48000, 5.9, 4000, 11.4], ["mirae", 36000, -11.8, 3000, -18.5], ["nippon", 48000, 4.6, 4000, 10.1], ["parag", 120000, 14.2, 5000, 15.8]] },
    { email: "rajesh.kapadia@example.com", name: "Rajesh Kapadia", clientCode: "DEMO1002", panMasked: "BCDPK****L", city: "Pune", phone: "+91 90000 00002", riskProfile: "Conservative",
      book: [["hdfcbal", 600000, 18.4, 0, 12.2], ["sbiliq", 350000, 6.6, 0, 6.9], ["icici", 200000, 22.1, 10000, 14.6], ["parag", 250000, 31.5, 10000, 17.3]] },
    { email: "neha.shah@example.com", name: "Neha Shah", clientCode: "DEMO1003", panMasked: "CDEPS****M", city: "Surat", phone: "+91 90000 00003", riskProfile: "Aggressive",
      book: [["axissmall", 90000, 8.7, 7500, 13.9], ["nippon", 90000, 12.4, 7500, 16.2], ["kotak", 60000, 6.1, 5000, 11.0], ["mirae", 24000, -6.4, 2000, -9.8]] },
];
const ADMIN = { email: "admin.demo@example.com", name: "Haria Admin (demo)", role: "advisor" };

const holding = (user, [key, invested, gainPct, sip, xirr], i) => {
    const f = FUNDS[key];
    const value = Math.round(invested * (1 + gainPct / 100) * 100) / 100;
    const units = Math.round((value / f.nav) * 1000) / 1000;
    return { user, assetClass: "Mutual Fund", ...f, folio: `DEMO/${7000 + i}`, invested, value, units,
        avgNav: Math.round((invested / units) * 100) / 100, sipAmount: sip, sipDay: [5, 10, 15, 20, 25, 28][i % 6],
        xirr, dayChange: Math.round(value * ((i % 3) - 0.8) * 0.0025 * 100) / 100, realised: 0, asOf: day(12) };
};
const history = (user, rows) => {
    const out = [];
    for (const [key, invested, , sip] of rows) {
        const f = FUNDS[key];
        if (sip) for (let m = 0; m < 6; m++) out.push({ user, date: new Date(Date.UTC(2026, 10 - m, 10)), type: "SIP", scheme: f.name, amount: sip, nav: f.nav * (1 - m * 0.012), units: Math.round((sip / (f.nav * (1 - m * 0.012))) * 1000) / 1000 });
        else out.push({ user, date: new Date(Date.UTC(2025, 3, 21)), type: "Purchase", scheme: f.name, amount: invested, nav: f.nav * 0.86, units: Math.round((invested / (f.nav * 0.86)) * 1000) / 1000 });
    }
    return out;
};

(async () => {
    await mongoose.connect(process.env.MONGO_URL);
    const demoUsers = await PortalUser.find({ email: DEMO });
    const ids = demoUsers.map((u) => u._id);
    await Promise.all([PortalHolding.deleteMany({ user: { $in: ids } }), PortalTxn.deleteMany({ user: { $in: ids } }),
        PortalSession.deleteMany({ user: { $in: ids } }), PortalAudit.deleteMany({ user: { $in: ids } })]);
    await PortalUser.deleteMany({ email: DEMO });
    if (process.argv.includes("--remove")) { console.log(`removed ${demoUsers.length} demo accounts`); return mongoose.disconnect(); }

    const lines = ["# Portal demo accounts (fictional people, invented numbers)", "", `Generated ${new Date().toISOString()}. Rerun \`node portal/seed-demo.js\` to rotate them.`, "",
        "| Where | Email | Password |", "|---|---|---|"];
    for (const p of [ADMIN, ...PEOPLE]) {
        const pw = S.tempPassword();
        const { book, ...fields } = p;
        const u = await PortalUser.create({ role: "client", ...fields, passwordHash: await S.hashPassword(pw), mustChangePassword: false });
        if (book) {
            await PortalHolding.insertMany(book.map((b, i) => holding(u._id, b, i)));
            await PortalTxn.insertMany(history(u._id, book));
        }
        lines.push(`| ${p.role === "advisor" ? "/admindash" : "/userdashboard"} | ${p.email} | \`${pw}\` |`);
    }
    fs.writeFileSync(path.join(__dirname, "DEMO-ACCOUNTS.local.md"), lines.join("\n") + "\n", { mode: 0o600 });
    console.log(`seeded ${PEOPLE.length} clients + 1 admin; passwords in portal/DEMO-ACCOUNTS.local.md`);
    await mongoose.disconnect();
})().catch((e) => { console.error(e.message); process.exit(1); });
