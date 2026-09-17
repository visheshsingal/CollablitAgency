import { useEffect, useState } from 'react'

export default function AdminSection({ section }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  const load = async () => {
    const response = await fetch('/api/admin-data')
    if (response.ok) setData(await response.json())
    else setData(false)
  }

  useEffect(() => { load() }, [])

  const login = async (event) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) })
    if (!response.ok) {
      setError('Invalid username or password.')
      return
    }
    load()
  }

  if (data === null) return <div className="section-state">Loading workspace...</div>
  if (data === false) return <main className="section-login"><form onSubmit={login}><p className="eyebrow">Admin access</p><h1>{section === 'leads' ? 'Lead desk' : 'Finance desk'}</h1><input placeholder="Username" value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} required /><div className="password-field"><input type={showPassword ? 'text' : 'password'} placeholder="Password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div>{error && <p className="error">{error}</p>}<button className="submit">Open section</button></form><style jsx>{styles}</style></main>

  const rows = section === 'leads' ? data.bookings : data.finance
  return <main className="section-page"><header><div><p className="eyebrow">Collablit Operations / {section}</p><h1>{section === 'leads' ? 'Lead desk' : 'Finance desk'}</h1><p className="subhead">{section === 'leads' ? 'Every meeting request, ready to qualify.' : 'Track income, expenses, and the current balance.'}</p></div><a href="/admin">Overview →</a></header><section className="summary"><strong>{section === 'leads' ? data.bookings.length : data.finance.length}</strong><span>{section === 'leads' ? 'meeting requests' : 'transactions recorded'}</span></section><section className="table-panel"><table><thead><tr>{section === 'leads' ? <><th>Client</th><th>Company</th><th>Meeting</th><th>Budget</th><th>Status</th></> : <><th>Client / payee</th><th>Category</th><th>Date</th><th>Amount</th><th>Type</th></>}</tr></thead><tbody>{rows.map((row) => section === 'leads' ? <tr key={row._id}><td><strong>{row.name}</strong><small>{row.email}</small></td><td>{row.company || '—'}</td><td>{row.meetingDate || 'TBD'}<small>{row.meetingTime || ''}</small></td><td>{row.budget || '—'}</td><td><span>{row.status || 'new'}</span></td></tr> : <tr key={row._id}><td>{row.client}</td><td>{row.category}</td><td>{row.date}</td><td className={row.type === 'income' ? 'income' : 'expense'}>{row.type === 'income' ? '+' : '-'}₹{Number(row.amount).toLocaleString('en-IN')}</td><td>{row.type}</td></tr>)}</tbody></table>{!rows.length && <p className="empty">Nothing recorded yet.</p>}</section><style jsx>{styles}</style></main>
}

const styles = `
  .section-page { max-width: 1120px; margin: 0 auto; padding: 48px 5vw 70px 260px; color:#173b5e; }.section-page header { display:flex; justify-content:space-between; align-items:flex-end; gap:20px; margin-bottom:28px; }.section-page header a { color:#a16d2b; font-weight:700; text-decoration:none; }.eyebrow { color:#ad702c; font-size:11px; font-weight:800; letter-spacing:.16em; text-transform:uppercase; margin:0 0 9px; }.section-page h1, .section-login h1 { font:400 clamp(2.4rem,4vw,4.2rem) Georgia,serif; margin:0; }.subhead { color:#71808b; }.summary { display:grid; gap:6px; width:180px; padding:20px; margin-bottom:14px; background:#173b5e; color:#fff; border-radius:7px; }.summary strong { font:400 2rem Georgia,serif; }.summary span { color:rgba(255,255,255,.7); font-size:.8rem; }.table-panel { background:rgba(255,255,255,.76); border:1px solid rgba(23,59,94,.1); border-radius:8px; padding:22px; overflow:auto; }table { width:100%; min-width:680px; border-collapse:collapse; text-align:left; }th { color:#87918e; font-size:.7rem; text-transform:uppercase; letter-spacing:.08em; padding:0 12px 12px; }td { border-top:1px solid #ecece7; padding:14px 12px; color:#53636e; font-size:.88rem; }td strong, td small { display:block; }td strong { color:#173b5e; }td small { margin-top:4px; color:#87918e; }td span { color:#21835d; background:#e3f3eb; padding:5px 9px; border-radius:20px; font-size:.75rem; }.income { color:#21835d; font-weight:700; }.expense { color:#b65f4d; font-weight:700; }.empty, .section-state { color:#87918e; }.section-state { padding:80px; text-align:center; }.section-login { min-height:100vh; display:grid; place-items:center; padding:24px; background:#f4f0e9; }.section-login form { width:min(400px,100%); display:grid; gap:13px; padding:36px; background:#fff; border-radius:8px; }.section-login input { width:100%; padding:12px; border:1px solid #dfe0dc; border-radius:4px; font:inherit; }.password-field { display:flex; border:1px solid #dfe0dc; border-radius:4px; overflow:hidden; }.password-field input { border:0; }.password-field button { border:0; padding:0 12px; background:#f4f0e9; color:#173b5e; }.submit { border:0; border-radius:4px; padding:13px; background:#173b5e; color:#fff; font-weight:700; }.error { color:#b65f4d; }
  @media (max-width:1100px) { .section-page { padding:34px 16px 60px; } }.@media (max-width:600px) { .section-page header { display:block; }.section-page header a { display:inline-block; margin-top:15px; } }
`
