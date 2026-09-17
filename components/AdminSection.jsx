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
        <div className="login-card">
          <div className="brand-wrap">
            <BrandLogo />
          </div>
          <div className="login-header">
            <span className="tag">SECURITY CHECK</span>
            <h1>{section === 'leads' ? 'Leads Access' : 'Finance Desk'}</h1>
            <p>Enter administrator credentials to proceed.</p>
          </div>
          <form onSubmit={login}>
            <div className="field">
              <label>Username</label>
              <input
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
            <div className="field">
              <label>Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
            <button type="submit" className="login-submit">Unlock Desk</button>
          </form>
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
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #f4f6fa;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .login-card {
    width: min(420px, 100%);
    background: #ffffff;
    border-radius: 12px;
    padding: 38px 32px;
    box-shadow: 0 16px 36px rgba(13, 37, 63, 0.08);
    border: 1px solid #e2e8f0;
  }
  .brand-wrap :global(.brand-logo) {
    display: block;
    width: 150px;
    height: 40px;
    object-fit: contain;
    object-position: left center;
  }
  .login-header {
    margin: 20px 0 22px;
  }
  .tag {
    font-size: 0.68rem;
    font-weight: 800;
    color: #ad702c;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .login-header h1 {
    margin: 4px 0 6px;
    font-size: 1.65rem;
    font-weight: 700;
    color: #0d253f;
  }
  .login-header p {
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
  .password-wrap {
    position: relative;
    display: flex;
  }
  .password-wrap input {
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
  .login-submit {
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
  .login-submit:hover {
    background: #173b5e;
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
