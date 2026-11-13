// www.hariainvestments.com/admindash: Haria Investments staff, every client. Advisor accounts only;
// the server refuses a client account at this door and refuses /admin/* to anyone but an advisor.
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { api, fmtDate, inr, pct, Portfolio, PortalUser, signed } from './api';
import { AuthLayout, ChoosePassword, ResetFromLink, SecurityPanel, Shell, SignIn, useIdleSignOut, useNoIndex, useSession } from './ui';
import PortfolioView from './PortfolioView';

type Row = PortalUser & { invested: number; value: number; sip: number; schemes: number; asOf: string | null };

export default function AdminPortal() {
    useNoIndex();
    useEffect(() => { document.title = 'Advisor desk · Haria Investments'; }, []);
    const s = useSession();
    const nav = useNavigate();
    useIdleSignOut(s.state === 'in', s.signOut);
    if (s.state === 'loading') return <div className="hp" />;
    return (
        <Routes>
            <Route path="reset" element={<ResetFromLink area="admin" />} />
            <Route path="*" element={
                s.state !== 'in' || !s.user || s.user.role !== 'advisor' ? (
                    <AuthLayout area="admin"><SignIn area="admin" startAtMfa={s.state === 'mfa'} onIn={(u) => { s.setUser(u); s.setState('in'); nav('/admindash'); }} /></AuthLayout>
                ) : s.user.mustChangePassword ? <ChoosePassword area="admin" onDone={(u) => s.setUser(u)} /> : (
                    <Shell area="admin" user={s.user} onSignOut={s.signOut} links={[{ to: '/admindash', label: 'Clients', end: true }, { to: '/admindash/activity', label: 'Activity' }, { to: '/admindash/account', label: 'Security' }]}>
                        <Routes>
                            <Route index element={<Clients />} />
                            <Route path="client/:id" element={<ClientDetail />} />
                            <Route path="activity" element={<Activity />} />
                            <Route path="account" element={<div className="hp-wrap"><SecurityPanel user={s.user} setUser={s.setUser} /></div>} />
                        </Routes>
                    </Shell>
                )} />
        </Routes>
    );
}

function PageHead({ eyebrow, title, right }: { eyebrow: string; title: React.ReactNode; right?: React.ReactNode }) {
    return (
        <section className="hp-hero" style={{ paddingBottom: 84 }}>
            <div className="hp-wrap hp-hero-grid hp-fade">
                <div><div className="eyebrow" style={{ color: 'rgba(245,241,230,.55)' }}>{eyebrow}</div>
                    <h1 className="display" style={{ fontWeight: 500, fontSize: 'clamp(32px,4vw,44px)', margin: '8px 0 0' }}>{title}</h1></div>
                {right}
            </div>
        </section>
    );
}

function Clients() {
    const [rows, setRows] = useState<Row[] | null>(null);
    const [q, setQ] = useState('');
    const [adding, setAdding] = useState(false);
    const nav = useNavigate();
    const load = useCallback(() => api<{ clients: Row[] }>('/admin/clients').then((d) => setRows(d.clients)), []);
    useEffect(() => { load(); }, [load]);
    const list = useMemo(() => (rows || []).filter((r) => `${r.name} ${r.email} ${r.clientCode || ''}`.toLowerCase().includes(q.toLowerCase())), [rows, q]);
    const tot = (rows || []).reduce((a, r) => ({ inv: a.inv + r.invested, val: a.val + r.value, sip: a.sip + r.sip }), { inv: 0, val: 0, sip: 0 });

    return (
        <>
            <PageHead eyebrow="Assets under advice" title={<><span style={{ fontSize: '.5em', opacity: .6, verticalAlign: '.6em', marginRight: 6 }}>₹</span>{Math.round(tot.val).toLocaleString('en-IN')}</>}
                right={<button className="hp-btn brass" onClick={() => setAdding(true)}>Add a client</button>} />
            <div className="hp-wrap">
                <div className="hp-kpis">
                    <div className="hp-kpi"><div className="eyebrow">Clients</div><div className="v">{rows?.length ?? 0}</div><div className="s">With portal access</div></div>
                    <div className="hp-kpi"><div className="eyebrow">Invested</div><div className="v">{inr(tot.inv, { compact: true })}</div><div className="s">Principal across clients</div></div>
                    <div className="hp-kpi"><div className="eyebrow">Gain</div><div className={`v ${tot.val >= tot.inv ? 'gain' : 'loss'}`}>{inr(tot.val - tot.inv, { compact: true })}</div><div className="s">{pct(tot.inv ? ((tot.val - tot.inv) / tot.inv) * 100 : 0)}</div></div>
                    <div className="hp-kpi"><div className="eyebrow">Monthly SIPs</div><div className="v">{inr(tot.sip, { compact: true })}</div><div className="s">Booked each month</div></div>
                </div>
                <section className="hp-card" style={{ margin: '26px 0 40px' }}>
                    <div className="hp-card-h" style={{ alignItems: 'center' }}><h3>Clients</h3>
                        <input className="hp-input" style={{ maxWidth: 280, height: 40 }} placeholder="Search name, email or code" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search clients" /></div>
                    <div className="hp-scroll" style={{ marginTop: 12 }}>
                        <table className="hp-table">
                            <thead><tr><th>Client</th><th className="hide-sm">Code</th><th className="r">Value</th><th className="r hide-sm">Gain</th><th className="r hide-sm">SIP / month</th><th className="hide-sm">Last sign-in</th></tr></thead>
                            <tbody>
                                {list.map((r) => { const g = r.value - r.invested; return (
                                    <tr key={r.id} className="click" tabIndex={0} onClick={() => nav(`/admindash/client/${r.id}`)} onKeyDown={(e) => e.key === 'Enter' && nav(`/admindash/client/${r.id}`)}>
                                        <td><b>{r.name}</b>{r.disabled && <span className="hp-badge off" style={{ marginLeft: 8 }}>Disabled</span>}<div style={{ fontSize: 12.5, color: 'var(--muted)' }}>{r.email}</div></td>
                                        <td className="hide-sm">{r.clientCode || ''}</td>
                                        <td className="r"><b>{inr(Math.round(r.value))}</b><div style={{ fontSize: 12, color: 'var(--muted)' }}>{r.schemes} schemes</div></td>
                                        <td className={`r hide-sm ${g >= 0 ? 'gain' : 'loss'}`}>{signed(Math.round(g))}<div style={{ fontSize: 12 }}>{pct(r.invested ? (g / r.invested) * 100 : 0)}</div></td>
                                        <td className="r hide-sm">{inr(r.sip)}</td>
                                        <td className="hide-sm" style={{ fontSize: 13, color: 'var(--muted)' }}>{r.lastLoginAt ? fmtDate(r.lastLoginAt, true) : 'Never'}</td>
                                    </tr>); })}
                                {rows && !list.length && <tr><td colSpan={6} style={{ color: 'var(--muted)' }}>No client matches that.</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
            {adding && <AddClient onClose={() => setAdding(false)} onDone={load} />}
        </>
    );
}

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose(); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);
    return <div className="hp-modal-bg" onClick={onClose}><div className="hp-modal hp-fade" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>{children}</div></div>;
}

function TempPassword({ who, pw }: { who: string; pw: string }) {
    const [copied, setCopied] = useState(false);
    return (<>
        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>Give {who} this temporary password in person or by phone. It is shown only once, and they must replace it the first time they sign in at <b>/userdashboard</b>.</p>
        <div className="hp-secret" style={{ fontSize: 18, textAlign: 'center', padding: 16 }}>{pw}</div>
        <button className="hp-btn ghost block" style={{ marginTop: 12 }} onClick={() => navigator.clipboard.writeText(pw).then(() => setCopied(true))}>{copied ? 'Copied' : 'Copy password'}</button>
    </>);
}

function AddClient({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
    const [f, setF] = useState({ name: '', email: '', phone: '', city: '', clientCode: '', pan: '' });
    const [err, setErr] = useState(''); const [temp, setTemp] = useState(''); const [busy, setBusy] = useState(false);
    const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement>) => setF({ ...f, [k]: e.target.value });
    return (
        <Modal onClose={onClose}>
            <h3>{temp ? 'Client added' : 'Add a client'}</h3>
            {temp ? <><TempPassword who={f.name} pw={temp} /><button className="hp-btn block" style={{ marginTop: 10 }} onClick={onClose}>Done</button></> :
                <form onSubmit={async (e) => {
                    e.preventDefault(); setErr(''); setBusy(true);
                    try { const d = await api<{ tempPassword: string }>('/admin/clients', { body: f }); setTemp(d.tempPassword); onDone(); }
                    catch (e: any) { setErr(e.message); } finally { setBusy(false); }
                }}>
                    <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 0 }}>They get a temporary password to sign in with. Add their holdings from their page afterwards.</p>
                    {err && <div className="hp-alert err">{err}</div>}
                    <div className="hp-field"><label htmlFor="n">Full name</label><input id="n" className="hp-input" required value={f.name} onChange={set('name')} /></div>
                    <div className="hp-field"><label htmlFor="e">Email</label><input id="e" className="hp-input" type="email" required value={f.email} onChange={set('email')} /></div>
                    <div className="hp-row">
                        <div className="hp-field"><label htmlFor="p">Mobile</label><input id="p" className="hp-input" value={f.phone} onChange={set('phone')} /></div>
                        <div className="hp-field"><label htmlFor="c">City</label><input id="c" className="hp-input" value={f.city} onChange={set('city')} /></div>
                    </div>
                    <div className="hp-row">
                        <div className="hp-field"><label htmlFor="cc">Client code</label><input id="cc" className="hp-input" value={f.clientCode} onChange={set('clientCode')} /></div>
                        <div className="hp-field"><label htmlFor="pan">PAN (stored masked)</label><input id="pan" className="hp-input" maxLength={10} value={f.pan} onChange={set('pan')} style={{ textTransform: 'uppercase' }} /></div>
                    </div>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}><button type="button" className="hp-btn ghost" onClick={onClose}>Cancel</button><button className="hp-btn" disabled={busy}>{busy ? 'Adding…' : 'Add client'}</button></div>
                </form>}
        </Modal>
    );
}

// Rows pasted from the back office's "Portfolio Valuation Report By Security", one fund per line.
const COLS = ['name', 'isin', 'category', 'invested', 'units', 'avgNav', 'nav', 'value', 'sipAmount', 'xirr', 'folio'];
const parseRows = (text: string) => text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
    .map((l) => (l.includes('\t') ? l.split('\t') : l.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/)).map((c) => c.replace(/^"|"$/g, '').trim()))
    .filter((c) => c[0] && !/^fund|^name|^scheme/i.test(c[0]))
    .map((c) => Object.fromEntries(COLS.map((k, i) => [k, c[i] ?? ''])));

function ImportHoldings({ id, name, onClose, onDone }: { id: string; name: string; onClose: () => void; onDone: () => void }) {
    const [text, setText] = useState(''); const [asOf, setAsOf] = useState(new Date().toISOString().slice(0, 10));
    const [err, setErr] = useState(''); const rows = useMemo(() => parseRows(text), [text]);
    return (
        <Modal onClose={onClose}>
            <h3>Update holdings</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.6, marginTop: 0 }}>Paste one fund per line, from a spreadsheet or CSV, in this order:<br /><span className="hp-secret" style={{ display: 'inline-block', marginTop: 6 }}>{COLS.join(', ')}</span><br />This replaces {name}'s current holdings.</p>
            {err && <div className="hp-alert err">{err}</div>}
            <textarea className="hp-textarea" value={text} onChange={(e) => setText(e.target.value)} aria-label="Holdings rows" />
            <div className="hp-row" style={{ marginTop: 12, alignItems: 'end' }}>
                <div className="hp-field" style={{ margin: 0 }}><label htmlFor="asof">NAV as on</label><input id="asof" type="date" className="hp-input" value={asOf} onChange={(e) => setAsOf(e.target.value)} /></div>
                <div style={{ fontSize: 13, color: 'var(--muted)' }}>{rows.length} fund{rows.length === 1 ? '' : 's'} read{rows.length ? `, ${inr(rows.reduce((a, r: any) => a + (Number(String(r.value).replace(/,/g, '')) || 0), 0))} in value` : ''}</div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 16 }}>
                <button className="hp-btn ghost" onClick={onClose}>Cancel</button>
                <button className="hp-btn" disabled={!rows.length} onClick={async () => { setErr(''); try { await api(`/admin/clients/${id}/holdings`, { body: { rows, asOf } }); onDone(); onClose(); } catch (e: any) { setErr(e.message); } }}>Replace holdings</button>
            </div>
        </Modal>
    );
}

function ClientDetail() {
    const { id = '' } = useParams();
    const [d, setD] = useState<(Portfolio & { client: Row }) | null>(null);
    const [err, setErr] = useState(''); const [modal, setModal] = useState<'' | 'import' | 'pw'>(''); const [temp, setTemp] = useState('');
    const load = useCallback(() => api<Portfolio & { client: Row }>(`/admin/clients/${id}`).then(setD).catch((e) => setErr(e.message)), [id]);
    useEffect(() => { load(); }, [load]);
    if (err) return <div className="hp-wrap" style={{ padding: 40 }}><div className="hp-alert err">{err}</div></div>;
    if (!d) return <div className="hp-hero" style={{ minHeight: 280 }} />;
    const c = d.client;
    return (
        <>
            <PortfolioView data={d} user={c} heading={
                <div className="hp-hello" style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                    <a href="/admindash" style={{ color: 'var(--brass-soft)', textDecoration: 'none' }}>← All clients</a>
                    <span>·</span><b>{c.name}</b><span>{c.email}</span>
                </div>} />
            <div className="hp-wrap" style={{ marginBottom: 40 }}>
                <section className="hp-card">
                    <div className="hp-card-h"><h3>Manage {c.name.split(' ')[0]}'s access</h3><span className="meta">Last sign-in {c.lastLoginAt ? fmtDate(c.lastLoginAt, true) : 'never'} · two-step {c.totpEnabled ? 'on' : 'off'}</span></div>
                    <div className="hp-card-b" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        <button className="hp-btn" onClick={() => setModal('import')}>Update holdings</button>
                        <button className="hp-btn ghost" onClick={async () => { const r = await api<{ tempPassword: string }>(`/admin/clients/${id}/reset-password`, { method: 'POST' }); setTemp(r.tempPassword); setModal('pw'); }}>Issue a new temporary password</button>
                        <button className="hp-btn danger" onClick={async () => { await api(`/admin/clients/${id}/disable`, { body: { disabled: !c.disabled } }); load(); }}>{c.disabled ? 'Restore access' : 'Disable access'}</button>
                    </div>
                </section>
            </div>
            {modal === 'import' && <ImportHoldings id={id} name={c.name} onClose={() => setModal('')} onDone={load} />}
            {modal === 'pw' && <Modal onClose={() => setModal('')}><h3>New temporary password</h3><TempPassword who={c.name} pw={temp} /><button className="hp-btn block" style={{ marginTop: 10 }} onClick={() => setModal('')}>Done</button></Modal>}
        </>
    );
}

const LABEL: Record<string, string> = {
    login: 'Signed in', login_failed: 'Wrong password', login_locked: 'Locked out', mfa_failed: 'Wrong code', portfolio_viewed: 'Viewed portfolio', password_changed: 'Changed password',
    password_reset: 'Reset password', forgot_sent: 'Asked for reset link', forgot_unknown: 'Reset asked for unknown email', totp_enabled: 'Turned on two-step', totp_disabled: 'Turned off two-step',
    admin_viewed_client: 'Admin viewed a client', admin_created_client: 'Admin added a client', admin_imported_holdings: 'Admin updated holdings', admin_reset_client_password: 'Admin reset a password',
    admin_disabled_client: 'Admin disabled a client', admin_enabled_client: 'Admin restored a client', login_wrong_area: 'Signed in at the wrong door', sessions_revoked: 'Signed out other devices', login_password_ok: 'Password accepted',
};
function Activity() {
    const [ev, setEv] = useState<any[]>([]);
    useEffect(() => { api('/admin/audit').then((d) => setEv(d.events)); }, []);
    return (<>
        <PageHead eyebrow="Audit trail" title="Who did what, and when" />
        <div className="hp-wrap"><section className="hp-card" style={{ marginTop: -56, position: 'relative', marginBottom: 40 }}>
            <div className="hp-scroll"><table className="hp-table">
                <thead><tr><th>When</th><th>What</th><th>Account</th><th className="hide-sm">From</th></tr></thead>
                <tbody>{ev.map((e, i) => <tr key={i}><td className="num" style={{ whiteSpace: 'nowrap' }}>{fmtDate(e.at, true)}</td>
                    <td className={/failed|locked|unknown|wrong/.test(e.event) ? 'loss' : ''}>{LABEL[e.event] || e.event}</td><td>{e.email}</td><td className="hide-sm num" style={{ color: 'var(--muted)' }}>{e.ip}</td></tr>)}</tbody>
            </table></div>
        </section></div>
    </>);
}
