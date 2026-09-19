import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import BrandLogo from '../components/BrandLogo.jsx'

export default function ClientLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch('/api/client-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.message || 'Invalid email address or password.')
        setLoading(false)
        return
      }
      window.location.href = '/client-dashboard'
    } catch {
      setError('Connection failed. Please verify your internet and try again.')
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>Client Portal Login | Collablit Solutions</title>
        <meta name="description" content="Secure client workspace portal for Collablit Solutions." />
      </Head>

      <main className="client-login-shell">
        <section className="login-brand-pane" aria-hidden="false">
          <div className="pane-glow" />
          <div className="pane-inner">
            <BrandLogo compact />
            <p className="pane-eyebrow">Client workspace</p>
            <h2>Your projects, documents, and meetings — in one place.</h2>
            <p className="pane-lead">
              A private portal for Collablit clients to follow milestones, open shared files, and join scheduled calls.
            </p>
            <ul className="pane-points">
              <li>
                <span className="point-mark" />
                Live project progress and status
              </li>
              <li>
                <span className="point-mark" />
                Secure document handoffs
              </li>
              <li>
                <span className="point-mark" />
                Meeting links when your session is ready
              </li>
            </ul>
          </div>
        </section>

        <section className="login-form-pane">
          <header className="login-topbar">
            <Link href="/" className="back-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to website</span>
            </Link>
            <span className="security-tag">
              <span className="sec-dot" />
              Encrypted portal
            </span>
          </header>

          <div className="login-center-box">
            <div className="login-card">
              <div className="mobile-brand">
                <BrandLogo compact />
              </div>
              <div className="card-header">
                <p className="badge-pill">Sign in</p>
                <h1>Welcome back</h1>
                <p>Use the email and password sent after your booking confirmation.</p>
              </div>

              {error && (
                <div className="error-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={submit} className="login-form">
                <div className="input-field-group">
                  <label htmlFor="client-email">Email address</label>
                  <div className="input-wrap">
                    <div className="input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <input
                      id="client-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@company.com"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="input-field-group">
                  <label htmlFor="client-password">Password</label>
                  <div className="input-wrap">
                    <div className="input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <input
                      id="client-password"
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-btn"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                <button type="submit" className="login-action-btn" disabled={loading}>
                  {loading ? (
                    <span className="btn-loading">
                      <span className="btn-spinner" />
                      Signing in…
                    </span>
                  ) : (
                    <span>Continue to workspace</span>
                  )}
                </button>
              </form>

              <p className="card-footer-note">
                Need help? Email <a href="mailto:vishesh.singal.contact@gmail.com">the Collablit team</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        .client-login-shell {
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(280px, 0.92fr) minmax(360px, 1.08fr);
          background: #f7f4ee;
          color: #0b234a;
        }

        .login-brand-pane {
          position: relative;
          overflow: hidden;
          background:
            linear-gradient(165deg, rgba(11, 35, 74, 0.92) 0%, rgba(7, 20, 34, 0.88) 100%),
            #0b234a;
          color: #fff;
          padding: 48px 52px;
          display: flex;
          align-items: center;
        }

        .pane-glow {
          position: absolute;
          width: 420px;
          height: 420px;
          right: -140px;
          bottom: -80px;
          background: radial-gradient(circle, rgba(201, 162, 39, 0.28) 0%, transparent 68%);
          pointer-events: none;
        }

        .pane-inner {
          position: relative;
          z-index: 1;
          max-width: 440px;
        }

        .pane-inner :global(.brand-logo) {
          display: block;
          width: 168px;
          height: 42px;
          object-fit: contain;
          object-position: left center;
          filter: brightness(0) invert(1);
          margin-bottom: 36px;
        }

        .pane-eyebrow {
          margin: 0 0 12px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #c9a227;
        }

        .pane-inner h2 {
          margin: 0 0 16px;
          font-family: 'Averia Serif Libre', Georgia, serif;
          font-size: clamp(1.7rem, 2.4vw, 2.35rem);
          line-height: 1.25;
          font-weight: 700;
        }

        .pane-lead {
          margin: 0 0 28px;
          font-size: 0.98rem;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.78);
        }

        .pane-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .pane-points li {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.88);
        }

        .point-mark {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #c9a227;
          box-shadow: 0 0 0 4px rgba(201, 162, 39, 0.18);
          flex-shrink: 0;
        }

        .login-form-pane {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .login-topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 40px 0;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #3d5a80;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 600;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #e4ddd0;
          background: #fff;
        }

        .back-link:hover {
          color: #0b234a;
          border-color: #c9a227;
        }

        .security-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #5c6b7e;
        }

        .sec-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
        }

        .login-center-box {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px 40px 56px;
        }

        .login-card {
          width: min(420px, 100%);
        }

        .mobile-brand {
          display: none;
          margin-bottom: 22px;
        }

        .mobile-brand :global(.brand-logo) {
          width: 148px;
          height: 38px;
          object-fit: contain;
          object-position: left center;
          filter: none !important;
        }

        .card-header {
          margin-bottom: 28px;
        }

        .badge-pill {
          margin: 0 0 10px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a07b1c;
        }

        .card-header h1 {
          margin: 0 0 8px;
          font-family: 'Averia Serif Libre', Georgia, serif;
          font-size: 2rem;
          font-weight: 700;
          color: #0b234a;
        }

        .card-header p {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
          color: #5c6b7e;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 0.86rem;
          margin-bottom: 18px;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .input-field-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }

        .input-field-group label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0b234a;
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: #8a97a8;
          pointer-events: none;
          display: flex;
        }

        .input-wrap input {
          width: 100%;
          background: #fff;
          border: 1px solid #ddd4c4;
          border-radius: 10px;
          padding: 13px 52px 13px 44px;
          font-size: 0.95rem;
          color: #0b234a;
          outline: none;
        }

        .input-wrap input:focus {
          border-color: #c9a227;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.18);
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: 0;
          color: #6b7a8d;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
        }

        .password-toggle-btn:hover {
          color: #0b234a;
        }

        .login-action-btn {
          margin-top: 6px;
          background: #0b234a;
          color: #fff;
          border: 0;
          border-radius: 10px;
          padding: 14px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(11, 35, 74, 0.18);
        }

        .login-action-btn:hover:not(:disabled) {
          background: #16345f;
        }

        .login-action-btn:disabled {
          opacity: 0.72;
          cursor: not-allowed;
        }

        .btn-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .card-footer-note {
          margin: 24px 0 0;
          padding-top: 18px;
          border-top: 1px solid #eadfcd;
          color: #6b7a8d;
          font-size: 0.82rem;
          line-height: 1.5;
        }

        .card-footer-note a {
          color: #0b234a;
          font-weight: 700;
        }

        @media (max-width: 900px) {
          .client-login-shell {
            grid-template-columns: 1fr;
          }
          .login-brand-pane {
            display: none;
          }
          .mobile-brand {
            display: block;
          }
          .login-form-pane {
            min-height: 100vh;
          }
        }

        @media (max-width: 540px) {
          .login-topbar,
          .login-center-box {
            padding-left: 20px;
            padding-right: 20px;
          }
          .card-header h1 {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </>
  )
}
