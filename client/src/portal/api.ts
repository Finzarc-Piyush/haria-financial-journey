// The portal talks to /api/v1/portal on its own origin. In production Vercel rewrites that path to
// the API project, so the session cookie is first-party, httpOnly, and never visible to scripts.
export type PortalUser = {
    id: string; name: string; email: string; role: 'client' | 'advisor'; clientCode?: string; panMasked?: string;
    phone?: string; city?: string; riskProfile?: string; totpEnabled: boolean; mustChangePassword: boolean; lastLoginAt?: string; disabled?: boolean;
};
export type Holding = {
    _id: string; assetClass: string; name: string; isin?: string; folio?: string; category?: string; amc?: string;
    invested: number; units: number; avgNav?: number; nav?: number; value: number; dayChange: number; sipAmount: number; sipDay?: number; xirr?: number; realised: number; asOf?: string;
};
export type Txn = { _id: string; date: string; type: string; scheme: string; amount: number; units: number; nav: number };
export type Portfolio = {
    asOf: string | null;
    totals: { invested: number; value: number; gain: number; gainPct: number; dayChange: number; realised: number; monthlySip: number; xirr: number | null; count: number };
    holdings: Holding[]; transactions: Txn[];
};

export class ApiError extends Error {
    constructor(message: string, public status: number, public body: any) { super(message); }
}

const BASE = '/api/v1/portal';

export async function api<T = any>(path: string, opts: { method?: string; body?: any } = {}): Promise<T> {
    const method = opts.method || (opts.body ? 'POST' : 'GET');
    const res = await fetch(BASE + path, {
        method,
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-Portal': '1' },
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        cache: 'no-store',
    });
    let data: any = null;
    try { data = await res.json(); } catch { /* empty */ }
    if (!res.ok || data?.success === false) {
        throw new ApiError(data?.message || (res.status >= 500 ? 'Something went wrong on our side. Please try again in a minute.' : 'Request failed'), res.status, data);
    }
    return data as T;
}

export const inr = (n: number, opts: { decimals?: boolean; compact?: boolean } = {}) => {
    const v = Number(n) || 0;
    if (opts.compact && Math.abs(v) >= 1e5) {
        if (Math.abs(v) >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
        return `₹${(v / 1e5).toFixed(2)} L`;
    }
    return `₹${v.toLocaleString('en-IN', { minimumFractionDigits: opts.decimals ? 2 : 0, maximumFractionDigits: opts.decimals ? 2 : 0 })}`;
};
export const pct = (n: number | null | undefined, sign = true) =>
    n == null || !isFinite(n) ? 'N/A' : `${sign && n > 0 ? '+' : ''}${n.toFixed(2)}%`;
export const signed = (n: number) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${inr(Math.abs(n))}`;
export const fmtDate = (d?: string | null, withTime = false) =>
    d ? new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}) }) : 'N/A';
