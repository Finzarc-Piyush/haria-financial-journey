import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import QRCode from 'qrcode';
import { api, ApiError, fmtDate, PortalUser } from './api';
import './portal.css';

export type Area = 'client' | 'admin';
export const base = (area: Area) => (area === 'admin' ? '/admindash' : '/userdashboard');

// ---------------------------------------------------------------------------------------------
// Session: who is signed in, as the server sees it. Nothing about the session lives in storage.
// ---------------------------------------------------------------------------------------------
export function useSession() {
    const [user, setUser] = useState<PortalUser | null>(null);
    const [state, setState] = useState<'loading' | 'out' | 'mfa' | 'in'>('loading');
    const refresh = useCallback(async () => {
        try {
            const d = await api<{ user: PortalUser }>('/me');
            setUser(d.user); setState('in');
        } catch (e) {
            if (e instanceof ApiError && e.body?.mfa) setState('mfa');
            else { setUser(null); setState('out'); }
        }
    }, []);
    useEffect(() => { refresh(); }, [refresh]);
    const signOut = useCallback(async () => {
        try { await api('/auth/logout', { method: 'POST' }); } catch { /* signed out anyway */ }
        setUser(null); setState('out');
    }, []);
    return { user, setUser, state, setState, refresh, signOut };
}

// Signed out after 30 idle minutes on the server; the page follows so stale figures are not left on screen.
export function useIdleSignOut(active: boolean, onIdle: () => void) {
    useEffect(() => {
        if (!active) return;
        let t: number;
        const reset = () => { window.clearTimeout(t); t = window.setTimeout(onIdle, 30 * 60 * 1000); };
        const evs = ['pointerdown', 'keydown', 'scroll', 'visibilitychange'];
        evs.forEach((e) => window.addEventListener(e, reset, { passive: true }));
        reset();
        return () => { window.clearTimeout(t); evs.forEach((e) => window.removeEventListener(e, reset)); };
    }, [active, onIdle]);
}

export function useNoIndex() {
    useEffect(() => {
        const m = document.createElement('meta');
        m.name = 'robots'; m.content = 'noindex, nofollow';
        document.head.appendChild(m);
        const prev = document.title;
        return () => { m.remove(); document.title = prev; };
    }, []);
}

// ---------------------------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------------------------
export const Shield = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
);
export const Caret = () => (
    <svg className="hp-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
);

export function PasswordInput(props: { id: string; value: string; onChange: (v: string) => void; autoComplete: string; autoFocus?: boolean }) {
    const [show, setShow] = useState(false);
    return (
        <div className="hp-pw">
            <input id={props.id} className="hp-input" type={show ? 'text' : 'password'} value={props.value} required autoFocus={props.autoFocus}
                autoComplete={props.autoComplete} onChange={(e) => props.onChange(e.target.value)} style={{ paddingRight: 64 }} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>{show ? 'Hide' : 'Show'}</button>
        </div>
    );
}

export const Brand = ({ to = '/' }: { to?: string }) => (
    <Link className="hp-brand" to={to} aria-label="Haria Investments home">
        <img src="/logo-wbg.png" alt="" /><span>Haria Investments</span>
    </Link>
);

// Slow brass contour lines on the sign-in panel: growth rings, drawn once a frame, still under reduced motion.
function ContourArt() {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const c = ref.current!; const ctx = c.getContext('2d')!;
        const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let raf = 0, t0 = performance.now();
        const draw = (now: number) => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = c.clientWidth, h = c.clientHeight;
            if (c.width !== w * dpr) { c.width = w * dpr; c.height = h * dpr; }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.clearRect(0, 0, w, h);
            const t = still ? 0 : (now - t0) / 1000;
            const cx = w * 0.92, cy = h * 0.88;
            for (let i = 0; i < 26; i++) {
                const r = 40 + i * Math.max(w, h) * 0.045;
                ctx.beginPath();
                for (let a = 0; a <= Math.PI * 2 + 0.05; a += 0.05) {
                    const wob = Math.sin(a * 3 + i * 0.6 + t * 0.12) * (4 + i * 0.9) + Math.sin(a * 5 - t * 0.08 + i) * (2 + i * 0.35);
                    const x = cx + Math.cos(a) * (r + wob), y = cy + Math.sin(a) * (r + wob) * 0.82;
                    a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `rgba(194,155,84,${0.05 + (i % 5 === 0 ? 0.14 : 0.05)})`;
                ctx.lineWidth = i % 5 === 0 ? 1.1 : 0.7;
                ctx.stroke();
            }
            if (!still) raf = requestAnimationFrame(draw);
        };
        raf = requestAnimationFrame(draw);
        const onR = () => { if (still) requestAnimationFrame(draw); };
        window.addEventListener('resize', onR);
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onR); };
    }, []);
    return <canvas ref={ref} aria-hidden="true" />;
}

export function AuthLayout({ area, children }: { area: Area; children: React.ReactNode }) {
    return (
        <div className="hp hp-auth">
            <aside className="hp-auth-art">
                <ContourArt />
                <Brand />
                <div className="hp-auth-quote">
                    <div className="eyebrow" style={{ color: 'var(--brass-soft)', marginBottom: 16 }}>{area === 'admin' ? 'Advisor desk' : 'Client portfolio'}</div>
                    {area === 'admin'
                        ? <h1>Every client's book, <em>in one place.</em></h1>
                        : <h1>Your wealth, <em>at a glance.</em></h1>}
                    <p>{area === 'admin'
                        ? 'Holdings, SIPs and sign-in activity for every client of Haria Investments.'
                        : 'Your holdings, SIPs and gains with Haria Investments, updated from the same records your advisor uses.'}</p>
                </div>
                <div className="hp-auth-foot">
                    <div><b>1957</b>Advising families since</div>
                    <div><b>2-step</b>Sign-in with an authenticator app</div>
                </div>
            </aside>
            <main className="hp-auth-form"><div className="hp-auth-card hp-fade">{children}</div></main>
        </div>
    );
}

const Assurance = () => (
    <div className="hp-assure"><Shield /><span>Your session ends after 30 minutes without activity. Haria Investments will never ask for your password by phone, email or WhatsApp.</span></div>
);

// ---------------------------------------------------------------------------------------------
// Sign in, with the second step when the account has an authenticator
// ---------------------------------------------------------------------------------------------
export function SignIn({ area, onIn, startAtMfa }: { area: Area; onIn: (u: PortalUser) => void; startAtMfa?: boolean }) {
    const [step, setStep] = useState<'pw' | 'mfa' | 'forgot' | 'sent'>(startAtMfa ? 'mfa' : 'pw');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');
    const [msg, setMsg] = useState('');
    const [busy, setBusy] = useState(false);
    const run = async (fn: () => Promise<void>) => { setErr(''); setBusy(true); try { await fn(); } catch (e: any) { setErr(e.message); } finally { setBusy(false); } };

    if (step === 'mfa') return (
        <form onSubmit={(e) => { e.preventDefault(); run(async () => { const d = await api<{ user: PortalUser }>('/auth/mfa', { body: { code } }); onIn(d.user); }); }}>
            <div className="eyebrow">Step 2 of 2</div>
            <h2>Enter your code</h2>
            <p className="lead">Open your authenticator app and type the 6-digit code for Haria Investments.</p>
            {err && <div className="hp-alert err" role="alert">{err}</div>}
            <div className="hp-field"><label htmlFor="code">Authenticator code</label>
                <input id="code" className="hp-input code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} autoFocus value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} /></div>
            <button className="hp-btn block" disabled={busy || code.length !== 6}>{busy ? 'Checking…' : 'Verify and continue'}</button>
            <Assurance />
        </form>
    );

    if (step === 'forgot' || step === 'sent') return (
        <form onSubmit={(e) => { e.preventDefault(); run(async () => { const d = await api<{ message: string }>('/auth/forgot', { body: { email } }); setMsg(d.message); setStep('sent'); }); }}>
            <div className="eyebrow">Password help</div>
            <h2>Reset your password</h2>
            <p className="lead">Enter the email your account uses and we'll send you a link to choose a new password.</p>
            {err && <div className="hp-alert err" role="alert">{err}</div>}
            {step === 'sent' ? <div className="hp-alert ok" role="status">{msg}</div> : <>
                <div className="hp-field"><label htmlFor="femail">Email</label>
                    <input id="femail" className="hp-input" type="email" autoComplete="email" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <button className="hp-btn block" disabled={busy}>{busy ? 'Sending…' : 'Send reset link'}</button></>}
            <p style={{ marginTop: 20 }}><button type="button" className="hp-link" onClick={() => { setStep('pw'); setErr(''); }}>Back to sign in</button></p>
        </form>
    );

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            run(async () => {
                const d = await api<{ user?: PortalUser; mfa?: boolean }>('/auth/login', { body: { email, password, area } });
                if (d.mfa) { setStep('mfa'); setPassword(''); } else if (d.user) onIn(d.user);
            });
        }}>
            <div className="eyebrow">{area === 'admin' ? 'Haria Investments · Admin' : 'Haria Investments · Clients'}</div>
            <h2>Sign in</h2>
            <p className="lead">{area === 'admin' ? 'For Haria Investments staff only.' : 'Use the email and password your advisor set up for you.'}</p>
            {err && <div className="hp-alert err" role="alert">{err}</div>}
            <div className="hp-field"><label htmlFor="email">Email</label>
                <input id="email" className="hp-input" type="email" autoComplete="username" required autoFocus value={email} onChange={(e) => setEmail(e.target.value)} /></div>
            <div className="hp-field"><label htmlFor="password">Password</label>
                <PasswordInput id="password" value={password} onChange={setPassword} autoComplete="current-password" /></div>
            <button className="hp-btn block" disabled={busy} style={{ marginTop: 6 }}>{busy ? 'Signing in…' : 'Sign in'}</button>
            <p style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <button type="button" className="hp-link" onClick={() => { setStep('forgot'); setErr(''); }}>Forgot password?</button>
                {area === 'client' && <a className="hp-link" href="/contact">Not a client yet?</a>}
            </p>
            <Assurance />
        </form>
    );
}

// ---------------------------------------------------------------------------------------------
// Choosing a password: first sign-in, and from a reset link
// ---------------------------------------------------------------------------------------------
const pwHint = 'At least 10 characters, with letters and a number. A short phrase is easiest to remember.';

export function ChoosePassword({ area, onDone }: { area: Area; onDone: (u: PortalUser) => void }) {
    const [current, setCurrent] = useState(''); const [next, setNext] = useState(''); const [again, setAgain] = useState('');
    const [err, setErr] = useState(''); const [busy, setBusy] = useState(false);
    return (
        <AuthLayout area={area}>
            <form onSubmit={async (e) => {
                e.preventDefault(); setErr('');
                if (next !== again) return setErr("The two new passwords don't match.");
                setBusy(true);
                try { const d = await api<{ user: PortalUser }>('/auth/change-password', { body: { current, next } }); onDone(d.user); }
                catch (e: any) { setErr(e.message); } finally { setBusy(false); }
            }}>
                <div className="eyebrow">First sign-in</div>
                <h2>Choose your password</h2>
                <p className="lead">You signed in with a temporary password. Replace it with one only you know. {pwHint}</p>
                {err && <div className="hp-alert err" role="alert">{err}</div>}
                <div className="hp-field"><label htmlFor="cur">Temporary password</label><PasswordInput id="cur" value={current} onChange={setCurrent} autoComplete="current-password" autoFocus /></div>
                <div className="hp-field"><label htmlFor="nw">New password</label><PasswordInput id="nw" value={next} onChange={setNext} autoComplete="new-password" /></div>
                <div className="hp-field"><label htmlFor="ag">New password again</label><PasswordInput id="ag" value={again} onChange={setAgain} autoComplete="new-password" /></div>
                <button className="hp-btn block" disabled={busy}>{busy ? 'Saving…' : 'Save and continue'}</button>
            </form>
        </AuthLayout>
    );
}

export function ResetFromLink({ area }: { area: Area }) {
    const [sp] = useSearchParams();
    const token = sp.get('token') || '';
    const nav = useNavigate();
    const [next, setNext] = useState(''); const [again, setAgain] = useState('');
    const [err, setErr] = useState(''); const [ok, setOk] = useState(''); const [busy, setBusy] = useState(false);
    useEffect(() => { if (token) window.history.replaceState(null, '', window.location.pathname); }, [token]);   // the token leaves the address bar
    const t = useRef(token);
    return (
        <AuthLayout area={area}>
            <form onSubmit={async (e) => {
                e.preventDefault(); setErr('');
                if (next !== again) return setErr("The two passwords don't match.");
                setBusy(true);
                try { const d = await api<{ message: string }>('/auth/reset', { body: { token: t.current, password: next } }); setOk(d.message); }
                catch (e: any) { setErr(e.message); } finally { setBusy(false); }
            }}>
                <div className="eyebrow">Password help</div>
                <h2>Choose a new password</h2>
                <p className="lead">{pwHint}</p>
                {err && <div className="hp-alert err" role="alert">{err}</div>}
                {ok ? <><div className="hp-alert ok" role="status">{ok}</div><button type="button" className="hp-btn block" onClick={() => nav(base(area))}>Go to sign in</button></> : <>
                    <div className="hp-field"><label htmlFor="nw">New password</label><PasswordInput id="nw" value={next} onChange={setNext} autoComplete="new-password" autoFocus /></div>
                    <div className="hp-field"><label htmlFor="ag">New password again</label><PasswordInput id="ag" value={again} onChange={setAgain} autoComplete="new-password" /></div>
                    <button className="hp-btn block" disabled={busy || !t.current}>{busy ? 'Saving…' : 'Save new password'}</button>
                    {!t.current && <p className="lead" style={{ marginTop: 14 }}>This page needs the link from your email.</p>}</>}
            </form>
        </AuthLayout>
    );
}

// ---------------------------------------------------------------------------------------------
// The signed-in frame
// ---------------------------------------------------------------------------------------------
export function Shell({ area, user, onSignOut, links, children }: {
    area: Area; user: PortalUser; onSignOut: () => void; links: { to: string; label: string; end?: boolean }[]; children: React.ReactNode;
}) {
    const initials = user.name.split(/\s+/).map((s) => s[0]).slice(0, 2).join('').toUpperCase();
    return (
        <div className="hp">
            {import.meta.env.VITE_PORTAL_TEST_BANNER !== 'off' && <div className="hp-testbar">Test version. The figures shown are sample data, not real holdings.</div>}
            <header className="hp-top">
                <div className="hp-top-inner">
                    <Brand to={base(area)} />
                    <nav className="hp-nav" aria-label="Portal">
                        {links.map((l) => <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'on' : '')}>{l.label}</NavLink>)}
                    </nav>
                    <div className="hp-me">
                        <span className="nm">{user.name}</span>
                        <span className="hp-avatar" aria-hidden="true">{initials}</span>
                        <button onClick={onSignOut}>Sign out</button>
                    </div>
                </div>
            </header>
            {children}
        </div>
    );
}

// ---------------------------------------------------------------------------------------------
// Security settings: authenticator, password, where you're signed in
// ---------------------------------------------------------------------------------------------
const deviceOf = (ua = '') => {
    const os = /iPhone|iPad/.test(ua) ? 'iPhone' : /Android/.test(ua) ? 'Android' : /Mac OS X/.test(ua) ? 'Mac' : /Windows/.test(ua) ? 'Windows' : 'Device';
    const br = /Edg\//.test(ua) ? 'Edge' : /Chrome\//.test(ua) ? 'Chrome' : /Safari\//.test(ua) ? 'Safari' : /Firefox\//.test(ua) ? 'Firefox' : 'Browser';
    return `${br} on ${os}`;
};
const EVENTS: Record<string, string> = {
    login: 'Signed in', login_failed: 'Wrong password entered', login_locked: 'Sign-in paused after wrong attempts', login_password_ok: 'Password accepted, code requested',
    mfa_failed: 'Wrong authenticator code', password_changed: 'Password changed', password_reset: 'Password reset by email link', forgot_sent: 'Reset link requested',
    totp_enabled: 'Two-step sign-in turned on', totp_disabled: 'Two-step sign-in turned off', sessions_revoked: 'Signed out other devices', portfolio_viewed: 'Viewed portfolio',
    admin_viewed_client: 'Viewed a client', admin_created_client: 'Created a client', admin_imported_holdings: 'Imported holdings', admin_reset_client_password: "Reset a client's password",
};

export function SecurityPanel({ user, setUser }: { user: PortalUser; setUser: (u: PortalUser) => void }) {
    const [sessions, setSessions] = useState<any[]>([]); const [activity, setActivity] = useState<any[]>([]);
    const [setup, setSetup] = useState<{ secret: string; qr: string } | null>(null);
    const [code, setCode] = useState(''); const [pw, setPw] = useState('');
    const [cur, setCur] = useState(''); const [nw, setNw] = useState('');
    const [msg, setMsg] = useState<{ k: 'ok' | 'err'; t: string } | null>(null);
    const load = useCallback(async () => { const d = await api('/security/sessions'); setSessions(d.sessions); setActivity(d.activity); }, []);
    useEffect(() => { load().catch(() => {}); }, [load]);
    const act = async (fn: () => Promise<void>) => { setMsg(null); try { await fn(); } catch (e: any) { setMsg({ k: 'err', t: e.message }); } };

    return (
        <div className="hp-settings">
            <section className="hp-card">
                <div className="hp-card-h"><h3>Two-step sign-in</h3>
                    <span className={`hp-badge ${user.totpEnabled ? 'on' : 'off'}`}>{user.totpEnabled ? 'On' : 'Off'}</span></div>
                <div className="hp-card-b">
                    {msg && <div className={`hp-alert ${msg.k}`} role="status">{msg.t}</div>}
                    <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, marginTop: 0 }}>
                        With this on, signing in needs your password and a 6-digit code from an authenticator app such as Google Authenticator or Microsoft Authenticator. Someone who learns your password still can't get in.
                    </p>
                    {!user.totpEnabled && !setup && <button className="hp-btn" onClick={() => act(async () => {
                        const d = await api<{ secret: string; uri: string }>('/security/totp/start', { method: 'POST' });
                        setSetup({ secret: d.secret, qr: await QRCode.toDataURL(d.uri, { margin: 1, width: 320, color: { dark: '#0b1424', light: '#ffffff' } }) });
                    })}>Turn on two-step sign-in</button>}
                    {setup && <>
                        <div className="hp-qr"><img src={setup.qr} alt="QR code to scan with your authenticator app" />
                            <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                                <b>1.</b> Scan this code with your authenticator app.<br /><b>2.</b> Type the 6-digit code it shows.
                                <div style={{ marginTop: 10, color: 'var(--muted)', fontSize: 12.5 }}>Can't scan? Enter this key instead:</div>
                                <div className="hp-secret">{setup.secret.match(/.{1,4}/g)?.join(' ')}</div></div></div>
                        <form style={{ display: 'flex', gap: 10 }} onSubmit={(e) => { e.preventDefault(); act(async () => {
                            const d = await api<{ user: PortalUser }>('/security/totp/confirm', { body: { code } });
                            setUser(d.user); setSetup(null); setCode(''); setMsg({ k: 'ok', t: 'Two-step sign-in is on. You will be asked for a code each time you sign in.' }); load();
                        }); }}>
                            <input className="hp-input code" style={{ maxWidth: 200 }} inputMode="numeric" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} aria-label="6-digit code" />
                            <button className="hp-btn" disabled={code.length !== 6}>Confirm</button>
                        </form></>}
                    {user.totpEnabled && <form style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} onSubmit={(e) => { e.preventDefault(); act(async () => {
                        const d = await api<{ user: PortalUser }>('/security/totp/disable', { body: { password: pw } }); setUser(d.user); setPw(''); setMsg({ k: 'ok', t: 'Two-step sign-in is off.' }); load();
                    }); }}>
                        <div style={{ flex: 1, minWidth: 200 }}><label htmlFor="dpw" style={{ fontSize: 13, fontWeight: 600, display: "block", marginBottom: 7 }}>Your password, to turn it off</label><PasswordInput id="dpw" value={pw} onChange={setPw} autoComplete="current-password" /></div>
                        <button className="hp-btn danger" style={{ alignSelf: "flex-end" }}>Turn off</button>
                    </form>}
                </div>
            </section>

            <section className="hp-card">
                <div className="hp-card-h"><h3>Password</h3></div>
                <form className="hp-card-b" onSubmit={(e) => { e.preventDefault(); act(async () => {
                    const d = await api<{ user: PortalUser }>('/auth/change-password', { body: { current: cur, next: nw } });
                    setUser(d.user); setCur(''); setNw(''); setMsg({ k: 'ok', t: 'Password changed. Every other device has been signed out.' }); load();
                }); }}>
                    <div className="hp-field"><label htmlFor="cpw">Current password</label><PasswordInput id="cpw" value={cur} onChange={setCur} autoComplete="current-password" /></div>
                    <div className="hp-field"><label htmlFor="npw">New password</label><PasswordInput id="npw" value={nw} onChange={setNw} autoComplete="new-password" />
                        <span style={{ fontSize: 12.5, color: 'var(--muted)' }}>{pwHint}</span></div>
                    <button className="hp-btn ghost">Change password</button>
                </form>
            </section>

            <section className="hp-card">
                <div className="hp-card-h"><h3>Where you're signed in</h3>
                    {sessions.length > 1 && <button className="hp-btn small ghost" onClick={() => act(async () => { const d = await api('/security/sessions/revoke-others', { method: 'POST' }); setMsg({ k: 'ok', t: `Signed out ${d.revoked} other device${d.revoked === 1 ? '' : 's'}.` }); load(); })}>Sign out others</button>}</div>
                <div className="hp-card-b">
                    {sessions.map((s) => <div className="hp-sess" key={s.id}>
                        <div><b>{deviceOf(s.ua)}</b>{s.current && <span className="hp-badge on" style={{ marginLeft: 8 }}>This device</span>}
                            <div className="sub">Signed in {fmtDate(s.createdAt, true)} · last active {fmtDate(s.lastSeenAt, true)}</div></div>
                    </div>)}
                </div>
            </section>

            <section className="hp-card">
                <div className="hp-card-h"><h3>Recent account activity</h3></div>
                <div className="hp-card-b">
                    {activity.map((a, i) => <div className="hp-sess" key={i}>
                        <div><b style={{ fontWeight: 600 }}>{EVENTS[a.event] || a.event}</b><div className="sub">{deviceOf(a.ua)}</div></div>
                        <div className="sub num">{fmtDate(a.at, true)}</div>
                    </div>)}
                    <p style={{ fontSize: 12.5, color: 'var(--muted)', marginBottom: 0 }}>Don't recognise something here? Change your password and call your advisor.</p>
                </div>
            </section>
        </div>
    );
}
