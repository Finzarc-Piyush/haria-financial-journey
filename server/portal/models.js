// Client portal data. Every collection is prefixed portal_ so it never mixes with the site's
// contact, analytics and financial-health collections in the same Atlas database.
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    role: { type: String, enum: ["client", "advisor"], default: "client" },
    clientCode: { type: String, trim: true, index: true },      // the back-office id, e.g. ICAN client code
    panMasked: { type: String, trim: true },                      // only ever stored masked: ABCDE****F
    phone: { type: String, trim: true },
    city: { type: String, trim: true },
    riskProfile: { type: String, trim: true },
    passwordHash: { type: String, required: true },
    passwordChangedAt: { type: Date, default: Date.now },
    mustChangePassword: { type: Boolean, default: true },
    failedLogins: { type: Number, default: 0 },
    lockUntil: { type: Date },
    totpSecretEnc: { type: String },                             // AES-256-GCM, key from PORTAL_ENC_KEY
    totpPendingEnc: { type: String },
    totpEnabled: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    lastLoginAt: { type: Date },
}, { timestamps: true, collection: "portal_users" });

const sessionSchema = new Schema({
    tokenHash: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "PortalUser", required: true, index: true },
    mfaPending: { type: Boolean, default: false },
    lastSeenAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
    ip: String,
    ua: String,
}, { timestamps: true, collection: "portal_sessions" });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const holdingSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "PortalUser", required: true, index: true },
    assetClass: { type: String, enum: ["Mutual Fund", "Equity", "Bond", "Fixed Deposit", "Insurance", "Other"], default: "Mutual Fund" },
    name: { type: String, required: true },
    isin: String,
    folio: String,
    category: String,           // Multi Asset, Value, Flexi Cap, Mid Cap, Gold & Silver...
    amc: String,
    invested: { type: Number, default: 0 },
    units: { type: Number, default: 0 },
    avgNav: Number,
    nav: Number,
    value: { type: Number, default: 0 },
    dayChange: { type: Number, default: 0 },
    sipAmount: { type: Number, default: 0 },
    sipDay: Number,
    xirr: Number,
    realised: { type: Number, default: 0 },
    asOf: Date,
}, { timestamps: true, collection: "portal_holdings" });

const txnSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "PortalUser", required: true, index: true },
    date: { type: Date, required: true },
    type: { type: String, enum: ["SIP", "Purchase", "Redemption", "Switch In", "Switch Out", "Dividend"], required: true },
    scheme: String,
    amount: Number,
    units: Number,
    nav: Number,
}, { timestamps: true, collection: "portal_transactions" });

const auditSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "PortalUser", index: true },
    email: String,
    event: { type: String, required: true },
    ip: String,
    ua: String,
    meta: Schema.Types.Mixed,
    at: { type: Date, default: Date.now },
}, { collection: "portal_audit" });
auditSchema.index({ at: 1 }, { expireAfterSeconds: 400 * 24 * 3600 });

const rateSchema = new Schema({
    key: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true },
}, { collection: "portal_rate" });
rateSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const resetSchema = new Schema({
    tokenHash: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "PortalUser", required: true },
    expiresAt: { type: Date, required: true },
}, { collection: "portal_resets" });
resetSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const m = (name, schema) => mongoose.models[name] || mongoose.model(name, schema);
module.exports = {
    PortalUser: m("PortalUser", userSchema),
    PortalSession: m("PortalSession", sessionSchema),
    PortalHolding: m("PortalHolding", holdingSchema),
    PortalTxn: m("PortalTxn", txnSchema),
    PortalAudit: m("PortalAudit", auditSchema),
    PortalRate: m("PortalRate", rateSchema),
    PortalReset: m("PortalReset", resetSchema),
};
