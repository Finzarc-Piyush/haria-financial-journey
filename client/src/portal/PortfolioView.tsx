import React, { useMemo, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { fmtDate, inr, pct, Portfolio, PortalUser, signed } from './api';
import { Caret } from './ui';

// One colour per category, ordered so neighbours in the donut never sit too close in hue.
const PALETTE = ['#1f3a68', '#c29b54', '#3f7d6e', '#8a5a83', '#d07a4f', '#5b8bc9', '#a7a25a', '#6b6f80', '#b8576a'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function PortfolioView({ data, user, heading }: { data: Portfolio; user: PortalUser; heading?: React.ReactNode }) {
    const { totals, holdings, transactions } = data;
    const [open, setOpen] = useState<string | null>(null);
    const up = totals.gain >= 0;

    const alloc = useMemo(() => {
        const m = new Map<string, number>();
        for (const h of holdings) m.set(h.category || h.assetClass, (m.get(h.category || h.assetClass) || 0) + h.value);
        return [...m.entries()].sort((a, b) => b[1] - a[1]).map(([name, value], i) => ({ name, value, color: PALETTE[i % PALETTE.length] }));
    }, [holdings]);
    const colorOf = (h: { category?: string; assetClass: string }) => alloc.find((a) => a.name === (h.category || h.assetClass))?.color || PALETTE[0];
    const maxVal = Math.max(1, ...holdings.map((h) => h.value));
    const sips = holdings.filter((h) => h.sipAmount > 0).sort((a, b) => (a.sipDay || 0) - (b.sipDay || 0));
    const now = new Date();
    const nextDate = (d?: number) => {
        if (!d) return null;
        const x = new Date(now.getFullYear(), now.getMonth(), d);
        if (x < now) x.setMonth(x.getMonth() + 1);
        return x;
    };
    const first = user.name.split(' ')[0];
    const hour = now.getHours();

    if (!holdings.length) return (
        <div className="hp-wrap" style={{ padding: '60px 24px' }}>
            <div className="hp-card hp-card-b" style={{ textAlign: 'center', padding: 48 }}>
                <h3 className="display" style={{ fontSize: 26, fontWeight: 500, margin: 0 }}>Your portfolio is being set up</h3>
                <p style={{ color: 'var(--muted)' }}>Your holdings will appear here once your advisor has added them.</p>
            </div>
        </div>
    );

    return (
        <>
            <section className="hp-hero">
                <div className="hp-wrap hp-hero-grid hp-fade">
                    <div>
                        {heading || <div className="hp-hello">{hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'}, <b>{first}</b></div>}
                        <div className="eyebrow" style={{ color: 'rgba(245,241,230,.55)', marginBottom: 10 }}>Current value</div>
                        <div className="hp-big"><small>₹</small>{Math.round(totals.value).toLocaleString('en-IN')}</div>
                        <div className="hp-hero-sub">
                            <span className={`hp-chip ${up ? 'gain' : 'loss'}`}>{up ? '▲' : '▼'} {signed(Math.round(totals.gain))} · {pct(totals.gainPct)}</span>
                            <span>on {inr(totals.invested)} invested</span>
                            <span className="num">Today {signed(Math.round(totals.dayChange))}</span>
                        </div>
                    </div>
                    <div className="hp-asof"><b>Valued at NAV of {fmtDate(data.asOf)}</b>{totals.count} holdings{user.clientCode ? ` · Client code ${user.clientCode}` : ''}</div>
                </div>
            </section>

            <div className="hp-wrap">
                <div className="hp-kpis hp-fade">
                    <div className="hp-kpi"><div className="eyebrow">Invested</div><div className="v">{inr(totals.invested, { compact: true })}</div><div className="s">Principal across {totals.count} schemes</div></div>
                    <div className="hp-kpi"><div className="eyebrow">Unrealised gain</div><div className={`v ${up ? 'gain' : 'loss'}`}>{signed(Math.round(totals.gain))}</div><div className="s">{pct(totals.gainPct)} absolute return</div></div>
                    <div className="hp-kpi"><div className="eyebrow">XIRR</div><div className="v">{pct(totals.xirr, false)}</div><div className="s">Annualised, value-weighted</div></div>
                    <div className="hp-kpi"><div className="eyebrow">Monthly SIP</div><div className="v">{inr(totals.monthlySip)}</div><div className="s">{sips.length} active SIP{sips.length === 1 ? '' : 's'}</div></div>
                </div>

                <div className="hp-grid">
                    <section className="hp-card" aria-labelledby="h-hold">
                        <div className="hp-card-h"><h3 id="h-hold">Holdings</h3><span className="meta">Tap a fund for details</span></div>
                        <div style={{ marginTop: 14 }}>
                            <div className="hp-hold hp-hold-head" aria-hidden="true">
                                <span>Fund</span><span className="r c-inv">Invested</span><span className="r">Value</span><span className="r c-x">Gain</span><span />
                            </div>
                            {holdings.map((h) => {
                                const g = h.value - h.invested, gp = h.invested ? (g / h.invested) * 100 : 0, isOpen = open === h._id;
                                return (
                                    <div key={h._id} className={`hp-hold ${isOpen ? 'open' : ''}`} role="button" tabIndex={0} aria-expanded={isOpen}
                                        onClick={() => setOpen(isOpen ? null : h._id)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(isOpen ? null : h._id); } }}>
                                        <div>
                                            <div className="name">{h.name}</div>
                                            <div className="cat"><span className="hp-dot" style={{ background: colorOf(h) }} />{h.category || h.assetClass}{h.sipAmount ? ` · SIP ${inr(h.sipAmount)}` : ''}</div>
                                            <div className="hp-bar"><i style={{ width: `${(h.value / maxVal) * 100}%`, background: colorOf(h) }} /></div>
                                        </div>
                                        <div className="r c-inv">{inr(h.invested)}</div>
                                        <div className="r"><b>{inr(Math.round(h.value))}</b><div className={`sub only-sm ${g >= 0 ? 'gain' : 'loss'}`}>{pct(gp)}</div></div>
                                        <div className={`r c-x ${g >= 0 ? 'gain' : 'loss'}`}>{signed(Math.round(g))}<div className="sub">{pct(gp)}</div></div>
                                        <Caret />
                                        {isOpen && <div className="hp-hold-x" onClick={(e) => e.stopPropagation()}>
                                            <div>Units<b>{h.units.toLocaleString('en-IN', { maximumFractionDigits: 3 })}</b></div>
                                            <div>Current NAV<b>{h.nav ? `₹${h.nav.toLocaleString('en-IN', { maximumFractionDigits: 4 })}` : 'N/A'}</b></div>
                                            <div>Average NAV<b>{h.avgNav ? `₹${h.avgNav.toLocaleString('en-IN', { maximumFractionDigits: 4 })}` : 'N/A'}</b></div>
                                            <div>XIRR<b className={(h.xirr || 0) >= 0 ? 'gain' : 'loss'}>{pct(h.xirr, false)}</b></div>
                                            <div>Gain<b className={g >= 0 ? 'gain' : 'loss'}>{signed(Math.round(g))} ({pct(gp)})</b></div>
                                            <div>Today<b>{signed(Math.round(h.dayChange))}</b></div>
                                            <div>ISIN<b>{h.isin || 'N/A'}</b></div>
                                            <div>Folio<b>{h.folio || 'N/A'}</b></div>
                                        </div>}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
                        <section className="hp-card" aria-labelledby="h-alloc">
                            <div className="hp-card-h"><h3 id="h-alloc">Allocation</h3><span className="meta">By category</span></div>
                            <div className="hp-card-b">
                                <div className="hp-donut">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={alloc} dataKey="value" nameKey="name" innerRadius="70%" outerRadius="96%" paddingAngle={2} stroke="none" isAnimationActive={!window.matchMedia('(prefers-reduced-motion: reduce)').matches}>
                                                {alloc.map((a) => <Cell key={a.name} fill={a.color} />)}
                                            </Pie>
                                            <Tooltip formatter={(v: number) => inr(Math.round(v))} contentStyle={{ borderRadius: 10, border: '1px solid var(--line)', background: 'var(--card)', color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="hp-donut-c"><div><b>{alloc.length}</b><span>Categories</span></div></div>
                                </div>
                                <div className="hp-legend">
                                    {alloc.map((a) => <div key={a.name}><span className="hp-dot" style={{ background: a.color }} /><span>{a.name}</span>
                                        <span className="num">{inr(a.value, { compact: true })}</span><span className="p">{((a.value / totals.value) * 100).toFixed(1)}%</span></div>)}
                                </div>
                            </div>
                        </section>

                        {sips.length > 0 && <section className="hp-card" aria-labelledby="h-sip">
                            <div className="hp-card-h"><h3 id="h-sip">Upcoming SIPs</h3><span className="meta num">{inr(totals.monthlySip)} a month</span></div>
                            <div className="hp-card-b hp-sips">
                                {sips.map((h) => { const d = nextDate(h.sipDay); return (
                                    <div className="hp-sip" key={h._id}>
                                        <div className="hp-cal">{d ? <><span>{MONTHS[d.getMonth()]}</span><b>{d.getDate()}</b></> : <><span>SIP</span><b>·</b></>}</div>
                                        <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.35 }}>{h.name}</div>
                                        <div className="num" style={{ fontWeight: 700 }}>{inr(h.sipAmount)}</div>
                                    </div>); })}
                            </div>
                        </section>}
                    </div>
                </div>

                {transactions.length > 0 && <section className="hp-card" style={{ marginBottom: 40 }} aria-labelledby="h-tx">
                    <div className="hp-card-h"><h3 id="h-tx">Recent transactions</h3><span className="meta">Latest {Math.min(transactions.length, 15)}</span></div>
                    <div className="hp-card-b hp-scroll">
                        <table className="hp-tx">
                            <thead><tr><th>Date</th><th>Type</th><th>Scheme</th><th className="r">Amount</th><th className="r">Units</th></tr></thead>
                            <tbody>{transactions.slice(0, 15).map((t) => <tr key={t._id}>
                                <td className="num" style={{ whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</td>
                                <td><span className={`hp-tag ${t.type === 'SIP' ? 'sip' : ''}`}>{t.type}</span></td>
                                <td style={{ minWidth: 200 }}>{t.scheme}</td>
                                <td className="r">{inr(t.amount)}</td>
                                <td className="r">{t.units?.toLocaleString('en-IN', { maximumFractionDigits: 3 })}</td>
                            </tr>)}</tbody>
                        </table>
                    </div>
                </section>}
                <p style={{ fontSize: 12, color: 'var(--faint)', lineHeight: 1.6, margin: '0 0 40px', maxWidth: '80ch' }}>
                    Mutual fund investments are subject to market risks; read all scheme-related documents carefully. Values use the NAV on the date shown and may differ from your account statement. For a statement for any purpose, contact your advisor.
                </p>
            </div>
        </>
    );
}
