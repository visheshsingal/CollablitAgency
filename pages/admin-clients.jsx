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
          <div className="login-box">
            <div className="logo-box">
              <BrandLogo />
            </div>
            <div className="box-header">
              <span className="tag">CLIENT PORTALS</span>
              <h1>Portal Manager</h1>
              <p>Sign in with administrator credentials to manage client progress.</p>
            </div>
            <form onSubmit={login}>
              <div className="field">
                <label>Username</label>
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
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>
              {error && <p className="error-alert">{error}</p>}
              <button type="submit" className="login-btn">Access Portals</button>
            </form>
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
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #f4f6fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .login-box {
    width: min(420px, 100%);
    background: #ffffff;
    border-radius: 12px;
    padding: 38px 32px;
    box-shadow: 0 16px 36px rgba(13, 37, 63, 0.08);
    border: 1px solid #e2e8f0;
  }
  .logo-box :global(.brand-logo) {
    display: block;
    width: 150px;
    height: 40px;
    object-fit: contain;
    object-position: left center;
  }
  .box-header {
    margin: 20px 0 22px;
  }
  .tag {
    font-size: 0.68rem;
    font-weight: 800;
    color: #ad702c;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .box-header h1 {
    margin: 4px 0 6px;
    font-size: 1.65rem;
    font-weight: 700;
    color: #0d253f;
  }
  .box-header p {
    margin: 0;
    font-size: 0.86rem;
    color: #64748b;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .field label {
    font-size: 0.8rem;
    font-weight: 700;
    color: #334155;
  }
  .field input {
    padding: 11px 13px;
    border: 1px solid #cbd5e1;
    border-radius: 7px;
    font-size: 0.9rem;
    outline: none;
  }
  .pass-wrap {
    position: relative;
    display: flex;
  }
  .pass-wrap input {
    width: 100%;
    padding-right: 60px;
  }
  .toggle-btn {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: 0;
    color: #64748b;
    font-size: 0.76rem;
    font-weight: 700;
    cursor: pointer;
  }
  .error-alert {
    margin: 0;
    color: #dc2626;
    background: #fee2e2;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.82rem;
  }
  .login-btn {
    margin-top: 6px;
    background: #0d253f;
    color: #fff;
    border: 0;
    padding: 12px;
    border-radius: 7px;
    font-size: 0.92rem;
    font-weight: 700;
    cursor: pointer;
  }
  .login-btn:hover {
    background: #173b5e;
  }
`
