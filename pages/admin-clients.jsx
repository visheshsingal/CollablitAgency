import { useEffect, useState } from 'react'
import Head from 'next/head'
import AdminLayout from '../components/AdminLayout.jsx'
import AdminClients from '../components/AdminClients.jsx'
import BrandLogo from '../components/BrandLogo.jsx'

export default function AdminClientsPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [clients, setClients] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadClients = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin-data')
      if (!response.ok) {
        setLoggedIn(false)
      } else {
        const data = await response.json()
        setClients(data.clients || [])
        setLoggedIn(true)
      }
    } catch {
      setLoggedIn(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadClients()
  }, [])

  const login = async (event) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      setError('Invalid username or password.')
      return
    }
    loadClients()
  }

  const logout = async () => {
    await fetch('/api/admin-auth', { method: 'DELETE' })
    setLoggedIn(false)
  }

  if (!loggedIn) {
    return (
      <>
        <Head>
          <title>Client Management | Collablit Solutions</title>
        </Head>
        <main className="client-admin-login-screen">
          <div className="bg-glow top-glow" />
          <div className="bg-glow bottom-glow" />
          <div className="login-box">
            <div className="logo-box">
              <BrandLogo compact light />
            </div>
            <div className="box-header">
              <div className="badge-pill">
                <span className="dot" />
                <span>CLIENT PORTALS MANAGER</span>
              </div>
              <h1>Portal Manager</h1>
              <p>Sign in with administrator credentials to manage client progress.</p>
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
            <form onSubmit={login} className="login-form">
              <div className="field">
                <label>Administrator Username</label>
                <input
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div className="field">
                <label>Password</label>
                <div className="pass-wrap">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    className="toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              <button type="submit" className="login-btn">Access Portals →</button>
            </form>
            <a href="/admin" className="back-link-sub">← Return to Main Admin</a>
          </div>
          <style jsx>{loginStyles}</style>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Client Management | Collablit Solutions</title>
      </Head>
      <AdminLayout
        title="Client Portals & Progress"
        kicker="Client Workspace"
        onRefresh={loadClients}
        onLogout={logout}
        loading={loading}
      >
        <div className="portals-container">
          <div className="portals-hero">
            <div>
              <h2>Client Workspace Dispatcher</h2>
              <p>Update real-time milestones, set progress percentages, and upload document links for each client.</p>
            </div>
            <div className="hero-metric">
              <span className="hero-num">{clients.length}</span>
              <span className="hero-sub">Managed Portals</span>
            </div>
          </div>

          <AdminClients clients={clients} onUpdated={loadClients} />
        </div>

        <style jsx>{`
          .portals-container {
            max-width: 1380px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .portals-hero {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px 28px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          }

          .portals-hero h2 {
            margin: 0 0 6px;
            font-size: 1.45rem;
            font-weight: 700;
            color: #0d253f;
          }

          .portals-hero p {
            margin: 0;
            font-size: 0.88rem;
            color: #64748b;
          }

          .hero-metric {
            background: #0d253f;
            color: #fff;
            padding: 12px 22px;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 130px;
          }

          .hero-num {
            font-size: 1.6rem;
            font-weight: 800;
            color: #d39b45;
            line-height: 1;
          }

          .hero-sub {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.7);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-top: 4px;
          }

          @media (max-width: 640px) {
            .portals-hero {
              flex-direction: column;
              align-items: flex-start;
              gap: 16px;
            }
            .hero-metric {
              width: 100%;
            }
          }
        `}</style>
      </AdminLayout>
    </>
  )
}

const loginStyles = `
  .client-admin-login-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #071422;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
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
  .login-box {
    position: relative;
    z-index: 10;
    width: min(450px, 100%);
    background: #0d2136;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 18px;
    padding: 42px 38px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
    display: flex;
    flex-direction: column;
  }
  .logo-box {
    margin-bottom: 20px;
  }
  .logo-box :global(.brand-logo) {
    display: block;
    width: auto;
    height: 26px;
    max-width: 112px;
    object-fit: contain;
    object-position: left center;
  }
  .box-header {
    margin-bottom: 22px;
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
  .box-header h1 {
    margin: 0 0 6px;
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
  }
  .box-header p {
    margin: 0;
    font-size: 0.86rem;
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
    gap: 16px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .field label {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
  }
  .field input {
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #fff;
    outline: none;
    transition: all 0.2s ease;
  }
  .field input:focus {
    border-color: #d39b45;
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 0 3px rgba(211, 155, 69, 0.2);
  }
  .pass-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .pass-wrap input {
    padding-right: 56px;
  }
  .toggle-btn {
    position: absolute;
    right: 12px;
    background: transparent;
    border: 0;
    color: rgba(255, 255, 255, 0.55);
    font-size: 0.76rem;
    font-weight: 700;
    cursor: pointer;
  }
  .toggle-btn:hover {
    color: #d39b45;
  }
  .login-btn {
    margin-top: 6px;
    background: linear-gradient(135deg, #d39b45 0%, #b87c28 100%);
    color: #071422;
    border: 0;
    padding: 13px;
    border-radius: 8px;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .login-btn:hover {
    box-shadow: 0 6px 20px rgba(211, 155, 69, 0.4);
    transform: translateY(-1px);
  }
  .back-link-sub {
    margin-top: 18px;
    text-align: center;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.82rem;
    text-decoration: none;
    font-weight: 600;
  }
  .back-link-sub:hover {
    color: #e2ad5c;
  }
`
