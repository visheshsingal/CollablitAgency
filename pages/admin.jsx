import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import AdminClients from '../components/AdminClients.jsx'

const money = (value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(value) || 0)
const dateLabel = (value) => value ? new Date(value).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'

export default function AdminPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [loggedIn, setLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [data, setData] = useState({ bookings: [], finance: [], clients: [] })
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState('')
  const [bookingStatus, setBookingStatus] = useState('all')
  const [financeForm, setFinanceForm] = useState({ type: 'income', client: '', category: '', amount: '', date: new Date().toISOString().slice(0, 10), note: '' })
  const [financeError, setFinanceError] = useState('')

  const loadData = async () => {
    setLoading(true)
    const response = await fetch('/api/admin-data')
    if (response.ok) {
      setData(await response.json())
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    setLoading(false)
  }

  useEffect(() => { loadData() }, [])

  useEffect(() => {
    if (loggedIn || typeof document === 'undefined') return undefined
    const input = document.querySelector('.admin-login input[type="password"]')
    if (!input || input.parentElement.querySelector('.password-toggle')) return undefined
    const wrapper = document.createElement('div')
    wrapper.className = 'password-toggle-wrap'
    input.parentElement.insertBefore(wrapper, input)
    wrapper.appendChild(input)
    const toggle = document.createElement('button')
    toggle.type = 'button'
    toggle.className = 'password-toggle'
    toggle.textContent = 'Show'
    toggle.addEventListener('click', () => {
      const visible = input.type === 'text'
      input.type = visible ? 'password' : 'text'
      toggle.textContent = visible ? 'Show' : 'Hide'
    })
    wrapper.appendChild(toggle)
    return () => toggle.remove()
  }, [loggedIn])

  const login = async (event) => {
    event.preventDefault()
    setLoginError('')
    const response = await fetch('/api/admin-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) })
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

  const filteredBookings = useMemo(() => data.bookings.filter((booking) => {
    const searchable = `${booking.name} ${booking.email} ${booking.company} ${booking.agenda}`.toLowerCase()
    return searchable.includes(query.toLowerCase()) && (bookingStatus === 'all' || (booking.status || 'new') === bookingStatus)
  }), [data.bookings, query, bookingStatus])

  const stats = useMemo(() => {
    const income = data.finance.filter((item) => item.type === 'income').reduce((sum, item) => sum + Number(item.amount), 0)
    const expense = data.finance.filter((item) => item.type === 'expense').reduce((sum, item) => sum + Number(item.amount), 0)
    return { income, expense, profit: income - expense }
  }, [data.finance])

  const monthlyBookings = useMemo(() => {
    const buckets = {}
    data.bookings.forEach((booking) => {
      const key = new Date(booking.createdAt).toLocaleDateString('en-IN', { month: 'short' })
      buckets[key] = (buckets[key] || 0) + 1
    })
    return Object.entries(buckets).slice(-6)
  }, [data.bookings])

  const addTransaction = async (event) => {
    event.preventDefault()
    setFinanceError('')
    const response = await fetch('/api/admin-data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(financeForm) })
    const result = await response.json()
    if (!response.ok) {
      setFinanceError(result.message || 'Could not save transaction.')
      return
    }
    setData((current) => ({ ...current, finance: [result.transaction, ...current.finance] }))
    setFinanceForm((current) => ({ ...current, client: '', amount: '', note: '' }))
  }

  const deleteTransaction = async (id) => {
    await fetch(`/api/admin-data?id=${id}`, { method: 'DELETE' })
    setData((current) => ({ ...current, finance: current.finance.filter((item) => item._id !== id) }))
  }

  if (!loggedIn) {
    return <><Head><title>Admin Login | Collablit Solutions</title></Head><main className="admin-login"><div className="login-panel"><span className="login-mark">CS</span><p className="kicker">Collablit Solutions</p><h1>Command centre</h1><p className="login-copy">Private access for your agency operations.</p><form onSubmit={login}><label>Username<input value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} autoComplete="username" required /></label><label>Password<input type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} autoComplete="current-password" required /></label>{loginError && <p className="form-error">{loginError}</p>}<button className="primary-button">Enter dashboard</button></form></div></main><style jsx>{styles}</style></>
  }

  return <><Head><title>Admin Dashboard | Collablit Solutions</title></Head><main className="admin-page"><header className="admin-header"><div><p className="kicker">Collablit Solutions / Operations</p><h1>Good morning, team.</h1><p className="subhead">A live view of enquiries, cash flow, and client momentum.</p></div><div className="header-actions"><button className="refresh-button" onClick={loadData}>{loading ? 'Refreshing...' : 'Refresh data'}</button><button className="logout-button" onClick={logout}>Sign out</button></div></header><section className="stat-grid"><div className="stat-card"><span>New enquiries</span><strong>{data.bookings.length}</strong><small>All meeting requests</small></div><div className="stat-card"><span>Total received</span><strong>{money(stats.income)}</strong><small className="positive">Client income</small></div><div className="stat-card"><span>Total spent</span><strong>{money(stats.expense)}</strong><small className="negative">Tracked expenses</small></div><div className="stat-card highlight"><span>Net position</span><strong>{money(stats.profit)}</strong><small>Income minus expenses</small></div></section><section className="chart-grid"><div className="panel"><div className="panel-heading"><div><p className="kicker">Pipeline</p><h2>Bookings by month</h2></div><span className="panel-note">{data.bookings.length} total</span></div><div className="bar-chart">{monthlyBookings.length ? monthlyBookings.map(([month, count]) => <div className="bar-item" key={month}><div className="bar-value">{count}</div><div className="bar" style={{ height: `${Math.max(18, count / Math.max(...monthlyBookings.map(([, value]) => value)) * 150)}px` }} /><small>{month}</small></div>) : <p className="empty-state">Bookings will appear here as soon as the first request arrives.</p>}</div></div><div className="panel"><div className="panel-heading"><div><p className="kicker">Cash flow</p><h2>Income vs spending</h2></div></div><div className="donut-wrap"><div className="donut" style={{ background: `conic-gradient(#d39b45 0deg ${stats.income + stats.expense ? stats.income / (stats.income + stats.expense) * 360 : 0}deg, #173b5e 0deg)` }}><div><strong>{money(stats.income - stats.expense)}</strong><small>net balance</small></div></div><div className="legend"><span><i className="income-dot" />Income <b>{money(stats.income)}</b></span><span><i className="expense-dot" />Expenses <b>{money(stats.expense)}</b></span></div></div></div></section><section className="panel bookings-panel"><div className="panel-heading"><div><p className="kicker">Client pipeline</p><h2>Meeting requests</h2></div><div className="filters"><input placeholder="Search client or email" value={query} onChange={(event) => setQuery(event.target.value)} /><select value={bookingStatus} onChange={(event) => setBookingStatus(event.target.value)}><option value="all">All statuses</option><option value="new">New</option></select></div></div><div className="table-wrap"><table><thead><tr><th>Client</th><th>Company</th><th>Preferred slot</th><th>Budget</th><th>Received</th><th>Status</th></tr></thead><tbody>{filteredBookings.map((booking) => <tr key={booking._id}><td><strong>{booking.name}</strong><small>{booking.email}</small></td><td>{booking.company || '—'}</td><td>{booking.meetingDate || '—'}<small>{booking.meetingTime || ''}</small></td><td>{booking.budget || '—'}</td><td>{dateLabel(booking.createdAt)}</td><td><span className="status-pill">{booking.status || 'new'}</span></td></tr>)}</tbody></table>{!filteredBookings.length && <p className="empty-state">No requests match these filters.</p>}</div></section><section className="finance-layout"><div className="panel"><div className="panel-heading"><div><p className="kicker">Ledger</p><h2>Recent transactions</h2></div></div><div className="transaction-list">{data.finance.map((item) => <div className="transaction" key={item._id}><div><strong>{item.client}</strong><small>{item.category} · {dateLabel(item.date)}</small></div><strong className={item.type === 'income' ? 'positive' : 'negative'}>{item.type === 'income' ? '+' : '-'}{money(item.amount)}</strong><button className="delete-button" aria-label="Delete transaction" onClick={() => deleteTransaction(item._id)}>×</button></div>)}{!data.finance.length && <p className="empty-state">Add your first income or expense to start tracking.</p>}</div></div><div className="panel add-panel"><div className="panel-heading"><div><p className="kicker">Update ledger</p><h2>Add transaction</h2></div></div><form className="finance-form" onSubmit={addTransaction}><div className="segmented"><button type="button" className={financeForm.type === 'income' ? 'selected' : ''} onClick={() => setFinanceForm({ ...financeForm, type: 'income' })}>Income</button><button type="button" className={financeForm.type === 'expense' ? 'selected expense-selected' : ''} onClick={() => setFinanceForm({ ...financeForm, type: 'expense' })}>Expense</button></div><input placeholder="Client or payee" value={financeForm.client} onChange={(event) => setFinanceForm({ ...financeForm, client: event.target.value })} required /><div className="input-row"><input type="number" min="1" placeholder="Amount (INR)" value={financeForm.amount} onChange={(event) => setFinanceForm({ ...financeForm, amount: event.target.value })} required /><input type="date" value={financeForm.date} onChange={(event) => setFinanceForm({ ...financeForm, date: event.target.value })} required /></div><input placeholder="Category (e.g. Website project)" value={financeForm.category} onChange={(event) => setFinanceForm({ ...financeForm, category: event.target.value })} /><input placeholder="Note (optional)" value={financeForm.note} onChange={(event) => setFinanceForm({ ...financeForm, note: event.target.value })} />{financeError && <p className="form-error">{financeError}</p>}<button className="primary-button">Save transaction</button></form></div></section></main><style jsx>{styles}</style></>
}

const styles = `
  :global(body) { background: #f4f0e9; color: #132b43; }
  .admin-page { max-width: 1440px; margin: 0 auto; padding: 42px 5vw 70px; }
  .admin-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 30px; margin-bottom: 34px; }
  .kicker { color: #ad702c; font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; margin: 0 0 9px; }
  h1, h2 { font-family: Georgia, serif; font-weight: 400; letter-spacing: 0; margin: 0; }
  h1 { color: #102e4a; font-size: clamp(2.3rem, 4vw, 4.2rem); }
  h2 { font-size: 1.65rem; color: #173b5e; }
  .subhead, .login-copy { color: #687582; margin: 12px 0 0; }
  .header-actions, .filters { display: flex; gap: 10px; align-items: center; }
  button { font: inherit; cursor: pointer; }
  .refresh-button, .logout-button, .primary-button { border: 0; border-radius: 5px; padding: 12px 16px; font-weight: 700; }
  .refresh-button { color: #173b5e; background: #fff; border: 1px solid #dfe0dc; }
  .logout-button { color: #946527; background: transparent; }
  .primary-button { color: #fff; background: #173b5e; width: 100%; }
  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; margin-bottom: 14px; }
  .stat-card, .panel { background: rgba(255,255,255,.75); border: 1px solid rgba(23,59,94,.1); border-radius: 8px; }
  .stat-card { padding: 22px; min-height: 140px; display: flex; flex-direction: column; }
  .stat-card span { color: #6e7b83; font-size: .88rem; }
  .stat-card strong { color: #173b5e; font: 400 2.15rem Georgia, serif; margin: 15px 0 7px; }
  .stat-card small { color: #87918e; }.positive { color: #21835d !important; }.negative { color: #b65f4d !important; }.highlight { background: #173b5e; }.highlight span, .highlight strong, .highlight small { color: #fff; }.highlight small { opacity: .65; }
  .chart-grid, .finance-layout { display: grid; grid-template-columns: 1.25fr .75fr; gap: 14px; margin-bottom: 14px; }
  .panel { padding: 24px; }.panel-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 24px; }.panel-note { color: #87918e; font-size: .85rem; }
  .bar-chart { height: 200px; display: flex; align-items: end; gap: clamp(14px, 4vw, 42px); padding: 15px 10px 0; border-bottom: 1px solid #d9ddd7; }.bar-item { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 5px; color: #87918e; }.bar { width: min(42px, 70%); background: #d39b45; border-radius: 3px 3px 0 0; min-height: 18px; }.bar-value { color: #173b5e; font-weight: 700; }.bar-item small { font-size: .75rem; }.donut-wrap { min-height: 200px; display: flex; justify-content: center; align-items: center; gap: 25px; }.donut { width: 170px; height: 170px; border-radius: 50%; display: grid; place-items: center; }.donut > div { width: 112px; height: 112px; border-radius: 50%; background: #fff; display: grid; place-content: center; text-align: center; }.donut strong { color: #173b5e; font: 400 1.2rem Georgia, serif; }.donut small { color: #87918e; font-size: .7rem; }.legend { display: grid; gap: 14px; color: #687582; font-size: .85rem; }.legend span { display: grid; grid-template-columns: 10px auto; gap: 7px; }.legend b { grid-column: 2; color: #173b5e; }.legend i { width: 9px; height: 9px; border-radius: 50%; margin-top: 3px; }.income-dot { background: #d39b45; }.expense-dot { background: #173b5e; }
  .filters input, .filters select, .finance-form input, .login-panel input { border: 1px solid #dfe0dc; border-radius: 4px; padding: 11px 12px; background: #fff; color: #173b5e; font: inherit; min-width: 0; }.filters input { width: 210px; }.filters select { width: 130px; }
  .table-wrap { overflow-x: auto; } table { width: 100%; border-collapse: collapse; text-align: left; min-width: 760px; } th { color: #87918e; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; font-weight: 700; padding: 0 14px 12px; } td { border-top: 1px solid #ecece7; padding: 15px 14px; color: #53636e; font-size: .9rem; } td:first-child { color: #173b5e; } td small, .transaction small { display: block; color: #8b9697; margin-top: 4px; }.status-pill { color: #21835d; background: #e3f3eb; border-radius: 20px; padding: 5px 10px; font-size: .75rem; }
  .transaction-list { display: grid; gap: 1px; }.transaction { display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 18px; padding: 14px 0; border-top: 1px solid #ecece7; color: #173b5e; }.delete-button { border: 0; background: transparent; color: #a5aaa6; font-size: 1.3rem; }.delete-button:hover { color: #b65f4d; }.finance-form { display: grid; gap: 11px; }.input-row { display: grid; grid-template-columns: 1fr 1fr; gap: 11px; }.segmented { display: grid; grid-template-columns: 1fr 1fr; background: #eeeae2; padding: 4px; border-radius: 5px; margin-bottom: 3px; }.segmented button { border: 0; background: transparent; border-radius: 3px; padding: 9px; color: #687582; }.segmented .selected { background: #21835d; color: #fff; }.segmented .expense-selected { background: #b65f4d; }.form-error { color: #b65f4d; margin: 0; font-size: .85rem; }.empty-state { color: #87918e; font-size: .9rem; padding: 18px 0; }.admin-login { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: radial-gradient(circle at top right, #f7e5c7, transparent 40%), #f4f0e9; }.login-panel { width: min(420px, 100%); background: #fff; padding: 45px; border: 1px solid #e6e0d5; border-radius: 8px; box-shadow: 0 25px 60px rgba(23,59,94,.1); }.login-mark { width: 45px; height: 45px; display: grid; place-items: center; border-radius: 50%; background: #173b5e; color: #d39b45; font-weight: 800; }.login-panel h1 { font-size: 2.6rem; margin-top: 25px; }.login-panel form { display: grid; gap: 16px; margin-top: 30px; }.login-panel label { display: grid; gap: 7px; color: #53636e; font-size: .85rem; font-weight: 700; }.login-panel input { width: 100%; }.login-panel .primary-button { margin-top: 4px; padding: 14px; }
  @media (max-width: 900px) { .stat-grid { grid-template-columns: repeat(2, 1fr); }.chart-grid, .finance-layout { grid-template-columns: 1fr; } }.@media (max-width: 620px) { .admin-page { padding: 28px 16px 50px; }.admin-header { display: block; }.header-actions { margin-top: 22px; }.stat-grid { grid-template-columns: 1fr 1fr; }.stat-card { padding: 16px; min-height: 120px; }.stat-card strong { font-size: 1.55rem; }.panel { padding: 17px; }.panel-heading { display: block; }.filters { margin-top: 16px; }.filters input { width: 100%; }.filters select { width: 125px; }.donut-wrap { gap: 14px; }.donut { width: 135px; height: 135px; }.donut > div { width: 90px; height: 90px; }.login-panel { padding: 30px 24px; } }
`
