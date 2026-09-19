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
        {/* Ambient background glows */}
        <div className="bg-glow top-glow" />
        <div className="bg-glow bottom-glow" />

        {/* Top Header Navigation */}
        <header className="login-topbar">
          <Link href="/" className="back-link">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            <span>Back to Collablit</span>
          </Link>
          <div className="security-tag">
            <span className="sec-dot" />
            <span>256-bit Encrypted Portal</span>
          </div>
        </header>

        {/* Main Login Card */}
        <div className="login-center-box">
          <div className="login-card">
            <div className="card-brand">
              <BrandLogo />
            </div>

            <div className="card-header">
              <div className="badge-pill">
                <span className="dot" />
                <span>CLIENT WORKSPACE</span>
              </div>
              <h1>Welcome back</h1>
              <p>Sign in to monitor project milestones, access documents, and manage meeting schedules.</p>
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
                <label>Email Address</label>
                <div className="input-wrap">
                  <div className="input-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <input
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
                <label>Password</label>
                <div className="input-wrap">
                  <div className="input-icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Enter account password"
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
                    Opening Workspace...
                  </span>
                ) : (
                  <span>Access Client Dashboard →</span>
                )}
              </button>
            </form>

            <div className="card-footer-note">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>Login credentials were sent to your email upon booking confirmation.</span>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .client-login-shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          background: #071422;
          color: #fff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          overflow: hidden;
        }

        /* Ambient Glows */
        .bg-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
          opacity: 0.45;
        }

        .top-glow {
          width: 450px;
          height: 450px;
          top: -120px;
          right: -100px;
          background: radial-gradient(circle, rgba(211, 155, 69, 0.28) 0%, rgba(13, 37, 63, 0) 70%);
        }

        .bottom-glow {
          width: 450px;
          height: 450px;
          bottom: -120px;
          left: -100px;
          background: radial-gradient(circle, rgba(23, 59, 94, 0.4) 0%, rgba(7, 20, 34, 0) 70%);
        }

        /* Topbar */
        .login-topbar {
          position: relative;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 36px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.2s ease;
          padding: 8px 14px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .back-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.16);
        }

        .security-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.55);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          padding: 6px 12px;
          border-radius: 20px;
        }

        .sec-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        /* Center Box */
        .login-center-box {
          position: relative;
          z-index: 10;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 20px 60px;
        }

        .login-card {
          width: min(460px, 100%);
          background: #0d2136;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 18px;
          padding: 42px 38px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
          display: flex;
          flex-direction: column;
        }

        .card-brand {
          margin-bottom: 22px;
        }

        .card-brand :global(.brand-logo) {
          display: block;
          width: 155px;
          height: 40px;
          object-fit: contain;
          object-position: left center;
          filter: brightness(0) invert(1);
        }

        .card-header {
          margin-bottom: 24px;
        }

        .badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(211, 155, 69, 0.12);
          border: 1px solid rgba(211, 155, 69, 0.28);
          color: #e2ad5c;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .badge-pill .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d39b45;
          box-shadow: 0 0 6px #d39b45;
        }

        .card-header h1 {
          margin: 0 0 8px;
          font-size: 1.85rem;
          font-weight: 700;
          color: #ffffff;
        }

        .card-header p {
          margin: 0;
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(239, 68, 68, 0.14);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
          padding: 11px 14px;
          border-radius: 8px;
          font-size: 0.84rem;
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
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
        }

        .input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
          display: flex;
          align-items: center;
        }

        .input-wrap input {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9px;
          padding: 13px 48px 13px 44px;
          font-size: 0.92rem;
          color: #fff;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-wrap input:focus {
          border-color: #d39b45;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 3px rgba(211, 155, 69, 0.2);
        }

        .input-wrap input::placeholder {
          color: rgba(255, 255, 255, 0.32);
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: 0;
          color: rgba(255, 255, 255, 0.55);
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          padding: 4px 6px;
        }

        .password-toggle-btn:hover {
          color: #d39b45;
        }

        .login-action-btn {
          margin-top: 6px;
          background: linear-gradient(135deg, #d39b45 0%, #b87c28 100%);
          color: #071422;
          border: 0;
          border-radius: 9px;
          padding: 14px;
          font-size: 0.94rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 18px rgba(211, 155, 69, 0.3);
        }

        .login-action-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(211, 155, 69, 0.45);
        }

        .login-action-btn:disabled {
          opacity: 0.75;
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
          border: 2px solid rgba(7, 20, 34, 0.3);
          border-top-color: #071422;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .card-footer-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.78rem;
          line-height: 1.45;
        }

        .card-footer-note svg {
          flex-shrink: 0;
          color: #d39b45;
          margin-top: 2px;
        }

        @media (max-width: 540px) {
          .login-topbar {
            padding: 18px 20px;
          }
          .security-tag {
            display: none;
          }
          .login-card {
            padding: 30px 24px;
          }
          .card-header h1 {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </>
  )
}
