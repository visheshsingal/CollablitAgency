import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import AdminLayout from '../components/AdminLayout.jsx'
import BrandLogo from '../components/BrandLogo.jsx'

const money = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0)

const dateLabel = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

export default function AdminPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [data, setData] = useState({ bookings: [], finance: [], clients: [] })
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [bookingStatus, setBookingStatus] = useState('all')
  const [financeForm, setFinanceForm] = useState({
    type: 'income',
    client: '',
    category: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  })
  const [financeError, setFinanceError] = useState('')

  const loadData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin-data')
      if (response.ok) {
        setData(await response.json())
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
      }
    } catch {
      setLoggedIn(false)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const login = async (event) => {
    event.preventDefault()
    setLoginError('')
    const response = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    if (!response.ok) {
      setLoginError('Invalid username or password.')
      return
    }
    await loadData()
  }

  const logout = async () => {
    await fetch('/api/admin-auth', { method: 'DELETE' })
    setLoggedIn(false)
    setData({ bookings: [], finance: [], clients: [] })
  }

  const filteredBookings = useMemo(() => {
    return data.bookings.filter((booking) => {
      const searchable = `${booking.name} ${booking.email} ${booking.company} ${booking.agenda}`.toLowerCase()
      return (
        searchable.includes(query.toLowerCase()) &&
        (bookingStatus === 'all' || (booking.status || 'new') === bookingStatus)
      )
    })
  }, [data.bookings, query, bookingStatus])

  const stats = useMemo(() => {
    const income = data.finance
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + Number(item.amount), 0)
    const expense = data.finance
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + Number(item.amount), 0)
    return { income, expense, profit: income - expense }
  }, [data.finance])

  const monthlyBookings = useMemo(() => {
    const buckets = {}
    data.bookings.forEach((booking) => {
      const key = new Date(booking.createdAt).toLocaleDateString('en-IN', {
        month: 'short',
      })
      buckets[key] = (buckets[key] || 0) + 1
    })
    return Object.entries(buckets).slice(-6)
  }, [data.bookings])

  const addTransaction = async (event) => {
    event.preventDefault()
    setFinanceError('')
    const response = await fetch('/api/admin-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(financeForm),
    })
    const result = await response.json()
    if (!response.ok) {
      setFinanceError(result.message || 'Could not save transaction.')
      return
    }
    setData((current) => ({
      ...current,
      finance: [result.transaction, ...current.finance],
    }))
    setFinanceForm((current) => ({
      ...current,
      client: '',
      amount: '',
      note: '',
    }))
  }

  const deleteTransaction = async (id) => {
    await fetch(`/api/admin-data?id=${id}`, { method: 'DELETE' })
    setData((current) => ({
      ...current,
      finance: current.finance.filter((item) => item._id !== id),
    }))
  }

  if (!loggedIn) {
    return (
      <>
        <Head>
          <title>Admin Operations Login | Collablit Solutions</title>
        </Head>
        <main className="admin-login-screen">
          <div className="bg-glow top-glow" />
          <div className="bg-glow bottom-glow" />

          <header className="login-topbar">
            <a href="/" className="back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              <span>Back to Public Site</span>
            </a>
            <div className="security-tag">
              <span className="sec-dot" />
              <span>Operations Security Protocol</span>
            </div>
          </header>

          <div className="login-center-box">
            <div className="login-card">
              <div className="brand-wrap">
                <BrandLogo compact />
              </div>
              <div className="login-header">
                <div className="badge-pill">
                  <span className="dot" />
                  <span>OPERATIONS COMMAND</span>
                </div>
                <h1>Administrator Access</h1>
                <p>Private command gateway for pipeline leads, ledger accounting, and operations.</p>
              </div>

              {loginError && (
                <div className="error-banner">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={login} className="login-form">
                <div className="input-field-group">
                  <label>Administrator Username</label>
                  <div className="input-wrap">
                    <div className="input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <input
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })
                      }
                      placeholder="Enter administrator username"
                      autoComplete="username"
                      required
                    />
                  </div>
                </div>

                <div className="input-field-group">
                  <label>Security Key / Password</label>
                  <div className="input-wrap">
                    <div className="input-icon">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={credentials.password}
                      onChange={(e) =>
                        setCredentials({ ...credentials, password: e.target.value })
                      }
                      placeholder="Enter admin password"
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

                <button type="submit" className="login-action-btn">
                  <span>Sign In to Command Center →</span>
                </button>
              </form>

              <div className="card-footer-note">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>Restricted access · Authorized Collablit personnel only.</span>
              </div>
            </div>
          </div>
          <style jsx>{loginStyles}</style>
        </main>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Overview | Collablit Solutions</title>
      </Head>
      <AdminLayout
        title="Overview & Pulse"
        kicker="Collablit Command"
        onRefresh={loadData}
        onLogout={logout}
        loading={loading}
      >
        <div className="dashboard-container">
          {/* Welcome Intro Header */}
          <div className="welcome-banner">
            <div>
              <h2>Welcome to Agency Operations</h2>
              <p>Real-time telemetry across pipeline enquiries, income ledger, and client progress.</p>
            </div>
            <div className="banner-stats">
              <div className="banner-stat-item">
                <span className="stat-label">Total Leads</span>
                <span className="stat-num">{data.bookings.length}</span>
              </div>
              <div className="banner-stat-divider" />
              <div className="banner-stat-item">
                <span className="stat-label">Ledger Entries</span>
                <span className="stat-num">{data.finance.length}</span>
              </div>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <section className="stat-grid">
            <div className="stat-card">
              <div className="card-top">
                <span className="card-kicker">INQUIRIES</span>
                <span className="card-icon-tag bg-blue">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                </span>
              </div>
              <strong className="metric-val">{data.bookings.length}</strong>
              <div className="metric-footer">
                <span className="footer-sub">All meeting bookings</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-top">
                <span className="card-kicker">RECEIVED REVENUE</span>
                <span className="card-icon-tag bg-green">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </span>
              </div>
              <strong className="metric-val text-green">{money(stats.income)}</strong>
              <div className="metric-footer">
                <span className="badge-pill positive-pill">+ Inflow</span>
                <span className="footer-sub">Client payments</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-top">
                <span className="card-kicker">EXPENDITURES</span>
                <span className="card-icon-tag bg-red">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </div>
              <strong className="metric-val text-red">{money(stats.expense)}</strong>
              <div className="metric-footer">
                <span className="badge-pill negative-pill">- Outflow</span>
                <span className="footer-sub">Operational costs</span>
              </div>
            </div>

            <div className="stat-card highlight-card">
              <div className="card-top">
                <span className="card-kicker">NET SURPLUS</span>
                <span className="card-icon-tag bg-gold">₹</span>
              </div>
              <strong className="metric-val highlight-val">{money(stats.profit)}</strong>
              <div className="metric-footer">
                <span className="footer-sub highlight-sub">Net after expenses</span>
              </div>
            </div>
          </section>

          {/* Charts Row */}
          <section className="chart-grid">
            {/* Bookings Monthly Bar Chart */}
            <div className="panel chart-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">TRACTION TREND</span>
                  <h3>Bookings by Month</h3>
                </div>
                <span className="count-pill">{data.bookings.length} Total</span>
              </div>
              <div className="bar-chart-container">
                {monthlyBookings.length ? (
                  <div className="bar-chart">
                    {monthlyBookings.map(([month, count]) => {
                      const maxVal = Math.max(...monthlyBookings.map(([, v]) => v)) || 1
                      const heightPx = Math.max(22, (count / maxVal) * 130)
                      return (
                        <div className="bar-col" key={month}>
                          <span className="bar-tooltip">{count}</span>
                          <div className="bar-fill" style={{ height: `${heightPx}px` }} />
                          <small className="bar-label">{month}</small>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="chart-empty">
                    <p>No meeting requests recorded yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Income vs Expenses Donut Chart */}
            <div className="panel chart-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">FINANCIAL BREAKDOWN</span>
                  <h3>Income vs Expenses</h3>
                </div>
              </div>
              <div className="donut-wrap">
                <div
                  className="donut-circle"
                  style={{
                    background: `conic-gradient(#d39b45 0deg ${
                      stats.income + stats.expense
                        ? (stats.income / (stats.income + stats.expense)) * 360
                        : 0
                    }deg, #0d253f 0deg)`,
                  }}
                >
                  <div className="donut-inner">
                    <strong>{money(stats.income - stats.expense)}</strong>
                    <small>Net Position</small>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="legend-row">
                    <span className="legend-dot dot-income" />
                    <span className="legend-name">Income</span>
                    <strong>{money(stats.income)}</strong>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot dot-expense" />
                    <span className="legend-name">Expense</span>
                    <strong>{money(stats.expense)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bookings / Enquiries Table */}
          <section className="panel table-panel">
            <div className="panel-header table-header">
              <div>
                <span className="panel-kicker">INCOMING INQUIRIES</span>
                <h3>Client Meeting Requests</h3>
              </div>
              <div className="filter-controls">
                <div className="search-box">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search name, company, email..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <select
                  value={bookingStatus}
                  onChange={(e) => setBookingStatus(e.target.value)}
                  className="select-status"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New</option>
                  <option value="confirmed">Confirmed</option>
                </select>
              </div>
            </div>

            <div className="table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Company</th>
                    <th>Preferred Slot</th>
                    <th>Budget</th>
                    <th>Received On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <strong className="client-cell-name">{b.name}</strong>
                        <span className="cell-sub">{b.email}</span>
                      </td>
                      <td>{b.company || '—'}</td>
                      <td>
                        <strong>{b.meetingDate || '—'}</strong>
                        <span className="cell-sub">{b.meetingTime || ''}</span>
                      </td>
                      <td>
                        <span className="budget-tag">{b.budget || '—'}</span>
                      </td>
                      <td>{dateLabel(b.createdAt)}</td>
                      <td>
                        <span className="status-pill">{b.status || 'new'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!filteredBookings.length && (
                <div className="empty-message">
                  <p>No meeting requests match the filter criteria.</p>
                </div>
              )}
            </div>
          </section>

          {/* Ledger Section */}
          <section className="finance-grid">
            {/* Recent Transactions List */}
            <div className="panel ledger-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">FINANCIAL LEDGER</span>
                  <h3>Recent Transactions</h3>
                </div>
                <span className="count-pill">{data.finance.length} entries</span>
              </div>
              <div className="ledger-items">
                {data.finance.map((item) => (
                  <div className="ledger-row" key={item._id}>
                    <div className="ledger-info">
                      <strong>{item.client}</strong>
                      <small>
                        {item.category || 'General'} · {dateLabel(item.date)}
                        {item.note && ` · ${item.note}`}
                      </small>
                    </div>
                    <div className="ledger-amount">
                      <strong className={item.type === 'income' ? 'val-positive' : 'val-negative'}>
                        {item.type === 'income' ? '+' : '-'}
                        {money(item.amount)}
                      </strong>
                      <button
                        className="delete-tx-btn"
                        onClick={() => deleteTransaction(item._id)}
                        title="Delete entry"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
                {!data.finance.length && (
                  <div className="empty-message">
                    <p>No transactions found. Add one on the right to start tracking.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Add Transaction Form */}
            <div className="panel form-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-kicker">NEW ENTRY</span>
                  <h3>Add Transaction</h3>
                </div>
              </div>
              <form className="tx-form" onSubmit={addTransaction}>
                <div className="type-toggle">
                  <button
                    type="button"
                    className={`toggle-btn ${financeForm.type === 'income' ? 'active-income' : ''}`}
                    onClick={() => setFinanceForm({ ...financeForm, type: 'income' })}
                  >
                    Income (+)
                  </button>
                  <button
                    type="button"
                    className={`toggle-btn ${financeForm.type === 'expense' ? 'active-expense' : ''}`}
                    onClick={() => setFinanceForm({ ...financeForm, type: 'expense' })}
                  >
                    Expense (-)
                  </button>
                </div>

                <div className="form-group">
                  <label>Client / Payee</label>
                  <input
                    placeholder="e.g. Acme Studio / Server Host"
                    value={financeForm.client}
                    onChange={(e) => setFinanceForm({ ...financeForm, client: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label>Amount (INR)</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="₹ 50,000"
                      value={financeForm.amount}
                      onChange={(e) => setFinanceForm({ ...financeForm, amount: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={financeForm.date}
                      onChange={(e) => setFinanceForm({ ...financeForm, date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    placeholder="e.g. Website Development, Cloud Hosting"
                    value={financeForm.category}
                    onChange={(e) => setFinanceForm({ ...financeForm, category: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Note (Optional)</label>
                  <input
                    placeholder="e.g. Milestone 1 advance"
                    value={financeForm.note}
                    onChange={(e) => setFinanceForm({ ...financeForm, note: e.target.value })}
                  />
                </div>

                {financeError && <p className="form-error-text">{financeError}</p>}

                <button type="submit" className="submit-tx-btn">
                  Record Entry
                </button>
              </form>
            </div>
          </section>
        </div>

        <style jsx>{styles}</style>
      </AdminLayout>
    </>
  )
}

const loginStyles = `
  .admin-login-screen {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    position: relative;
    background: #071422;
    color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    overflow: hidden;
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
    background: #d39b45;
    box-shadow: 0 0 6px #d39b45;
  }

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

  .brand-wrap {
    margin-bottom: 22px;
  }

  .brand-wrap :global(.brand-logo) {
    display: block;
    width: 155px;
    height: 40px;
    object-fit: contain;
    object-position: left center;
    filter: brightness(0) invert(1);
  }

  .login-header {
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

  .login-header h1 {
    margin: 0 0 8px;
    font-size: 1.85rem;
    font-weight: 700;
    color: #ffffff;
  }

  .login-header p {
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

  .login-action-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 24px rgba(211, 155, 69, 0.45);
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
    .login-header h1 {
      font-size: 1.6rem;
    }
  }
`

const styles = `
  .dashboard-container {
    max-width: 1380px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  /* Welcome Banner */
  .welcome-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #0d253f 0%, #173b5e 100%);
    color: #fff;
    padding: 24px 28px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(13, 37, 63, 0.12);
  }

  .welcome-banner h2 {
    margin: 0 0 6px;
    font-size: 1.5rem;
    font-weight: 700;
    color: #ffffff;
  }

  .welcome-banner p {
    margin: 0;
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.72);
  }

  .banner-stats {
    display: flex;
    align-items: center;
    gap: 22px;
    background: rgba(255, 255, 255, 0.08);
    padding: 10px 18px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }

  .banner-stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .stat-label {
    font-size: 0.7rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.65);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stat-num {
    font-size: 1.3rem;
    font-weight: 800;
    color: #d39b45;
  }

  .banner-stat-divider {
    width: 1px;
    height: 28px;
    background: rgba(255, 255, 255, 0.16);
  }

  /* Stat Grid */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .stat-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 20px 22px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
  }

  .stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06);
  }

  .card-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  .card-kicker {
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #64748b;
  }

  .card-icon-tag {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: grid;
    place-items: center;
    font-weight: 800;
  }

  .bg-blue {
    background: #e0f2fe;
    color: #0369a1;
  }

  .bg-green {
    background: #dcfce7;
    color: #15803d;
  }

  .bg-red {
    background: #fee2e2;
    color: #b91c1c;
  }

  .bg-gold {
    background: rgba(211, 155, 69, 0.2);
    color: #d39b45;
  }

  .metric-val {
    font-size: 1.85rem;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
    margin-bottom: 8px;
  }

  .text-green {
    color: #16a34a;
  }

  .text-red {
    color: #dc2626;
  }

  .highlight-card {
    background: #0d253f;
    border-color: #0d253f;
    color: #fff;
  }

  .highlight-card .card-kicker {
    color: rgba(255, 255, 255, 0.65);
  }

  .highlight-val {
    color: #ffffff;
  }

  .highlight-sub {
    color: rgba(255, 255, 255, 0.65) !important;
  }

  .metric-footer {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
  }

  .badge-pill {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 12px;
  }

  .positive-pill {
    background: #dcfce7;
    color: #166534;
  }

  .negative-pill {
    background: #fee2e2;
    color: #991b1b;
  }

  .footer-sub {
    font-size: 0.78rem;
    color: #94a3b8;
  }

  /* Panels Common */
  .panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .panel-kicker {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    color: #ad702c;
    text-transform: uppercase;
    display: block;
    margin-bottom: 4px;
  }

  .panel-header h3 {
    margin: 0;
    font-size: 1.18rem;
    font-weight: 700;
    color: #0f172a;
  }

  .count-pill {
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 20px;
  }

  /* Charts */
  .chart-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 16px;
  }

  .bar-chart-container {
    height: 190px;
    display: flex;
    align-items: flex-end;
    padding: 10px 0;
  }

  .bar-chart {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-around;
    height: 100%;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 4px;
  }

  .bar-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    flex: 1;
  }

  .bar-tooltip {
    font-size: 0.78rem;
    font-weight: 700;
    color: #0d253f;
  }

  .bar-fill {
    width: 36px;
    max-width: 70%;
    background: linear-gradient(180deg, #e8b76c 0%, #d39b45 100%);
    border-radius: 4px 4px 0 0;
    min-height: 16px;
    transition: height 0.4s ease;
  }

  .bar-label {
    font-size: 0.74rem;
    font-weight: 600;
    color: #64748b;
  }

  .chart-empty {
    width: 100%;
    text-align: center;
    color: #94a3b8;
    padding: 50px 0;
    font-size: 0.88rem;
  }

  /* Donut */
  .donut-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    min-height: 190px;
  }

  .donut-circle {
    width: 145px;
    height: 145px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  .donut-inner {
    width: 95px;
    height: 95px;
    border-radius: 50%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 6px;
  }

  .donut-inner strong {
    font-size: 0.88rem;
    font-weight: 800;
    color: #0d253f;
  }

  .donut-inner small {
    font-size: 0.65rem;
    color: #94a3b8;
    text-transform: uppercase;
  }

  .donut-legend {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .legend-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
  }

  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .dot-income {
    background: #d39b45;
  }

  .dot-expense {
    background: #0d253f;
  }

  .legend-name {
    color: #64748b;
    width: 60px;
  }

  /* Table */
  .table-header {
    flex-wrap: wrap;
    gap: 16px;
  }

  .filter-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .search-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-box svg {
    position: absolute;
    left: 10px;
    color: #94a3b8;
  }

  .search-box input {
    padding: 8px 12px 8px 32px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    color: #0f172a;
    width: 230px;
    outline: none;
  }

  .select-status {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    color: #0f172a;
    background: #fff;
    outline: none;
  }

  .table-responsive {
    overflow-x: auto;
  }

  .admin-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 720px;
    text-align: left;
  }

  .admin-table th {
    font-size: 0.72rem;
    font-weight: 700;
    color: #64748b;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 10px 14px;
    border-bottom: 2px solid #e2e8f0;
  }

  .admin-table td {
    padding: 14px;
    font-size: 0.88rem;
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }

  .client-cell-name {
    display: block;
    color: #0d253f;
    font-size: 0.9rem;
  }

  .cell-sub {
    display: block;
    font-size: 0.76rem;
    color: #94a3b8;
    margin-top: 2px;
  }

  .budget-tag {
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

  .empty-message {
    padding: 40px;
    text-align: center;
    color: #94a3b8;
    font-size: 0.88rem;
  }

  /* Finance Grid */
  .finance-grid {
    display: grid;
    grid-template-columns: 1.35fr 1fr;
    gap: 16px;
  }

  .ledger-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 420px;
    overflow-y: auto;
  }

  .ledger-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 14px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
  }

  .ledger-info strong {
    display: block;
    font-size: 0.9rem;
    color: #0d253f;
  }

  .ledger-info small {
    display: block;
    font-size: 0.74rem;
    color: #64748b;
    margin-top: 2px;
  }

  .ledger-amount {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .val-positive {
    color: #16a34a;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .val-negative {
    color: #dc2626;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .delete-tx-btn {
    background: transparent;
    border: 0;
    color: #cbd5e1;
    font-size: 1.3rem;
    cursor: pointer;
    line-height: 1;
    padding: 0 4px;
  }

  .delete-tx-btn:hover {
    color: #ef4444;
  }

  /* Transaction Form */
  .tx-form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .type-toggle {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    background: #f1f5f9;
    padding: 4px;
    border-radius: 8px;
    margin-bottom: 4px;
  }

  .toggle-btn {
    border: 0;
    padding: 8px;
    border-radius: 6px;
    font-size: 0.84rem;
    font-weight: 700;
    cursor: pointer;
    background: transparent;
    color: #64748b;
    transition: all 0.15s ease;
  }

  .active-income {
    background: #16a34a;
    color: #ffffff;
  }

  .active-expense {
    background: #dc2626;
    color: #ffffff;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .form-group label {
    font-size: 0.78rem;
    font-weight: 700;
    color: #475569;
  }

  .form-group input {
    padding: 9px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.86rem;
    color: #0f172a;
    outline: none;
  }

  .form-group input:focus {
    border-color: #0d253f;
  }

  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .form-error-text {
    color: #dc2626;
    font-size: 0.8rem;
    margin: 0;
  }

  .submit-tx-btn {
    margin-top: 4px;
    background: #0d253f;
    color: #fff;
    border: 0;
    padding: 11px;
    border-radius: 7px;
    font-size: 0.88rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.15s ease;
  }

  .submit-tx-btn:hover {
    background: #173b5e;
  }

  /* Breakpoints */
  @media (max-width: 1024px) {
    .stat-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    .chart-grid, .finance-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .welcome-banner {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
    .banner-stats {
      width: 100%;
      justify-content: space-around;
    }
    .stat-grid {
      grid-template-columns: 1fr;
    }
    .donut-wrap {
      flex-direction: column;
      gap: 18px;
    }
    .filter-controls {
      width: 100%;
    }
    .search-box {
      flex: 1;
    }
    .search-box input {
      width: 100%;
    }
  }
`
