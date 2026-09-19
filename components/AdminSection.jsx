import { useEffect, useState } from 'react'
import AdminLayout from './AdminLayout.jsx'
import BrandLogo from './BrandLogo.jsx'

export default function AdminSection({ section }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const load = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin-data')
      if (response.ok) setData(await response.json())
      else setData(false)
    } catch {
      setData(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
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
    load()
  }

  const logout = async () => {
    await fetch('/api/admin-auth', { method: 'DELETE' })
    setData(false)
  }

  if (data === null) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Connecting to operational database...</p>
        <style jsx>{`
          .loading-container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 14px;
            background: #f4f6fa;
            color: #64748b;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .spinner {
            width: 32px;
            height: 32px;
            border: 3px solid #cbd5e1;
            border-top-color: #0d253f;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  if (data === false) {
    return (
      <main className="section-login-wrap">
        <div className="bg-glow top-glow" />
        <div className="bg-glow bottom-glow" />
        <div className="login-card">
          <div className="brand-wrap">
            <BrandLogo compact light />
          </div>
          <div className="login-header">
            <div className="badge-pill">
              <span className="dot" />
              <span>{section === 'leads' ? 'LEADS DESK' : 'FINANCE DESK'}</span>
            </div>
            <h1>Administrator Access</h1>
            <p>Authentication required for {section === 'leads' ? 'client inquiries' : 'financial records'}.</p>
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
              <div className="input-wrap">
                <input
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label>Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
            <button type="submit" className="login-submit">Unlock Operations Desk →</button>
          </form>
          <a href="/admin" className="back-link-sub">← Return to Main Admin</a>
        </div>
        <style jsx>{loginStyles}</style>
      </main>
    )
  }

  const rows = section === 'leads' ? data.bookings : data.finance
  const pageTitle = section === 'leads' ? 'Leads & Enquiries' : 'Finance & Ledger'
  const isLeads = section === 'leads'

  return (
    <AdminLayout
      title={pageTitle}
      kicker="Specialized Desk"
      onRefresh={load}
      onLogout={logout}
      loading={loading}
    >
      <div className="desk-container">
        {/* Top Summary Banner */}
        <div className="desk-banner">
          <div>
            <h2>{isLeads ? 'Client Meeting & Inquiries Desk' : 'Financial Ledger & Cashflow'}</h2>
            <p>
              {isLeads
                ? 'All incoming leads from prospective clients across the website.'
                : 'Direct ledger view of incoming client payments and operational expenses.'}
            </p>
          </div>
          <div className="metric-pill">
            <span className="metric-number">{rows.length}</span>
            <span className="metric-desc">{isLeads ? 'Total Requests' : 'Total Entries'}</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="desk-panel">
          <div className="table-responsive">
            <table className="desk-table">
              <thead>
                <tr>
                  {isLeads ? (
                    <>
                      <th>Client Name</th>
                      <th>Company</th>
                      <th>Meeting Slot</th>
                      <th>Budget</th>
                      <th>Status</th>
                    </>
                  ) : (
                    <>
                      <th>Client / Payee</th>
                      <th>Category</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Type</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) =>
                  isLeads ? (
                    <tr key={row._id}>
                      <td>
                        <strong className="lead-name">{row.name}</strong>
                        <span className="lead-email">{row.email}</span>
                      </td>
                      <td>{row.company || '—'}</td>
                      <td>
                        <strong>{row.meetingDate || 'TBD'}</strong>
                        <span className="lead-time">{row.meetingTime || ''}</span>
                      </td>
                      <td>
                        <span className="budget-chip">{row.budget || '—'}</span>
                      </td>
                      <td>
                        <span className="status-pill">{row.status || 'new'}</span>
                      </td>
                    </tr>
                  ) : (
                    <tr key={row._id}>
                      <td>
                        <strong className="lead-name">{row.client}</strong>
                        {row.note && <span className="lead-email">{row.note}</span>}
                      </td>
                      <td>{row.category || 'General'}</td>
                      <td>{row.date}</td>
                      <td className={row.type === 'income' ? 'val-positive' : 'val-negative'}>
                        {row.type === 'income' ? '+' : '-'}₹{Number(row.amount).toLocaleString('en-IN')}
                      </td>
                      <td>
                        <span className={`type-tag ${row.type}`}>
                          {row.type}
                        </span>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>

            {!rows.length && (
              <div className="empty-state">
                <p>No records found for this section yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{styles}</style>
    </AdminLayout>
  )
}

const loginStyles = `
  .section-login-wrap {
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
  .login-card {
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
  .brand-wrap {
    margin-bottom: 20px;
  }
  .brand-wrap :global(.brand-logo) {
    display: block;
    width: auto;
    height: 26px;
    max-width: 112px;
    object-fit: contain;
    object-position: left center;
  }
  .login-header {
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
  .login-header h1 {
    margin: 0 0 6px;
    font-size: 1.75rem;
    font-weight: 700;
    color: #ffffff;
  }
  .login-header p {
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
  .password-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }
  .password-wrap input {
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
  .login-submit {
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
  .login-submit:hover {
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

const styles = `
  .desk-container {
    max-width: 1380px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .desk-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 22px 26px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .desk-banner h2 {
    margin: 0 0 6px;
    font-size: 1.4rem;
    font-weight: 700;
    color: #0d253f;
  }

  .desk-banner p {
    margin: 0;
    font-size: 0.88rem;
    color: #64748b;
  }

  .metric-pill {
    background: #0d253f;
    color: #fff;
    padding: 12px 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 120px;
  }

  .metric-number {
    font-size: 1.6rem;
    font-weight: 800;
    color: #d39b45;
    line-height: 1;
  }

  .metric-desc {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-top: 4px;
  }

  .desk-panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }

  .table-responsive {
    overflow-x: auto;
  }

  .desk-table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    min-width: 720px;
  }

  .desk-table th {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    padding: 10px 14px;
    border-bottom: 2px solid #e2e8f0;
  }

  .desk-table td {
    padding: 14px;
    font-size: 0.88rem;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }

  .lead-name {
    display: block;
    color: #0d253f;
    font-size: 0.9rem;
  }

  .lead-email, .lead-time {
    display: block;
    font-size: 0.76rem;
    color: #94a3b8;
    margin-top: 2px;
  }

  .budget-chip {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.82rem;
  }

  .status-pill {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    background: #ecfdf5;
    color: #047857;
  }

  .val-positive {
    color: #16a34a;
    font-weight: 700;
  }

  .val-negative {
    color: #dc2626;
    font-weight: 700;
  }

  .type-tag {
    display: inline-block;
    padding: 3px 9px;
    border-radius: 12px;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .type-tag.income {
    background: #dcfce7;
    color: #166534;
  }

  .type-tag.expense {
    background: #fee2e2;
    color: #991b1b;
  }

  .empty-state {
    padding: 40px;
    text-align: center;
    color: #94a3b8;
    font-size: 0.9rem;
  }

  @media (max-width: 640px) {
    .desk-banner {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .metric-pill {
      width: 100%;
    }
  }
`
