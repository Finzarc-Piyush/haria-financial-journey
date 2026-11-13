// www.hariainvestments.com/userdashboard: one client, their own portfolio, nothing else.
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { api, Portfolio } from './api';
import { AuthLayout, ChoosePassword, ResetFromLink, SecurityPanel, Shell, SignIn, useIdleSignOut, useNoIndex, useSession } from './ui';
import PortfolioView from './PortfolioView';

const Loading = () => <div className="hp" style={{ display: 'grid', placeItems: 'center' }}><div className="eyebrow">Loading your portfolio…</div></div>;

function usePortfolio() {
    const [data, setData] = useState<Portfolio | null>(null);
    const [err, setErr] = useState('');
    useEffect(() => { api<Portfolio>('/portfolio').then(setData).catch((e) => setErr(e.message)); }, []);
    return { data, err };
}

export default function ClientPortal() {
    useNoIndex();
    useEffect(() => { document.title = 'My Portfolio · Haria Investments'; }, []);
    const s = useSession();
    const nav = useNavigate();
    useIdleSignOut(s.state === 'in', s.signOut);

    if (s.state === 'loading') return <Loading />;
    return (
        <Routes>
            <Route path="reset" element={<ResetFromLink area="client" />} />
            <Route path="*" element={
                s.state !== 'in' || !s.user || s.user.role !== 'client' ? (
                    <AuthLayout area="client"><SignIn area="client" startAtMfa={s.state === 'mfa'} onIn={(u) => { s.setUser(u); s.setState('in'); nav('/userdashboard'); }} /></AuthLayout>
                ) : s.user.mustChangePassword ? (
                    <ChoosePassword area="client" onDone={(u) => s.setUser(u)} />
                ) : (
                    <Shell area="client" user={s.user} onSignOut={s.signOut} links={[{ to: '/userdashboard', label: 'Portfolio', end: true }, { to: '/userdashboard/account', label: 'Account & security' }]}>
                        <Routes>
                            <Route index element={<ClientHome user={s.user} />} />
                            <Route path="account" element={<Account user={s.user} setUser={s.setUser} />} />
                            <Route path="*" element={<ClientHome user={s.user} />} />
                        </Routes>
                    </Shell>
                )} />
        </Routes>
    );
}

function ClientHome({ user }: { user: NonNullable<ReturnType<typeof useSession>['user']> }) {
    const { data, err } = usePortfolio();
    if (err) return <div className="hp-wrap" style={{ padding: 40 }}><div className="hp-alert err">{err}</div></div>;
    if (!data) return <div className="hp-hero" style={{ minHeight: 280 }} />;
    return <PortfolioView data={data} user={user} />;
}

function Account({ user, setUser }: { user: any; setUser: (u: any) => void }) {
    return (
        <>
            <section className="hp-hero" style={{ paddingBottom: 40 }}>
                <div className="hp-wrap hp-fade">
                    <div className="eyebrow" style={{ color: 'rgba(245,241,230,.55)' }}>Account</div>
                    <h1 className="display" style={{ fontWeight: 500, fontSize: 40, margin: '8px 0 0' }}>{user.name}</h1>
                </div>
            </section>
            <div className="hp-wrap">
                <div className="hp-settings" style={{ marginBottom: 0 }}>
                    <section className="hp-card">
                        <div className="hp-card-h"><h3>Your details</h3></div>
                        <div className="hp-card-b">
                            <dl className="hp-kv">
                                <dt>Email</dt><dd>{user.email}</dd>
                                <dt>Mobile</dt><dd>{user.phone || 'Not on record'}</dd>
                                <dt>PAN</dt><dd className="num">{user.panMasked || 'Not on record'}</dd>
                                <dt>City</dt><dd>{user.city || 'Not on record'}</dd>
                                <dt>Client code</dt><dd>{user.clientCode || 'Not on record'}</dd>
                                <dt>Risk profile</dt><dd>{user.riskProfile || 'Not assessed yet'}</dd>
                            </dl>
                            <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 0 }}>Something out of date? Ask your advisor to update it. Your PAN is shown masked and is never stored in full here.</p>
                        </div>
                    </section>
                    <section className="hp-card">
                        <div className="hp-card-h"><h3>Your advisor</h3></div>
                        <div className="hp-card-b" style={{ fontSize: 14, lineHeight: 1.7 }}>
                            <p style={{ marginTop: 0 }}>Questions about a holding, a new SIP or a redemption? Speak to Haria Investments directly.</p>
                            <a className="hp-btn ghost" href="/contact">Contact your advisor</a>
                        </div>
                    </section>
                </div>
                <SecurityPanel user={user} setUser={setUser} />
            </div>
        </>
    );
}
