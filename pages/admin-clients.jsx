import { useEffect, useState } from 'react'
import Head from 'next/head'
import AdminClients from '../components/AdminClients.jsx'

export default function AdminClientsPage() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [clients, setClients] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [error, setError] = useState('')

  const loadClients = async () => {
    const response = await fetch('/api/admin-data')
    if (!response.ok) {
      setLoggedIn(false)
      return
    }
    const data = await response.json()
    setClients(data.clients || [])
    setLoggedIn(true)
  }

  useEffect(() => { loadClients() }, [])

  const login = async (event) => {
    event.preventDefault()
    setError('')
    const response = await fetch('/api/admin-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(credentials) })
    if (!response.ok) {
      setError('Invalid username or password.')
      return
    }
    loadClients()
  }

  if (!loggedIn) return <><Head><title>Client Management | Collablit Solutions</title></Head><main className="admin-login"><div className="login-panel"><span className="login-mark">CS</span><p className="kicker">Collablit Solutions</p><h1>Client portals</h1><p className="login-copy">Sign in to update client workspaces.</p><form onSubmit={login}><label>Username<input value={credentials.username} onChange={(event) => setCredentials({ ...credentials, username: event.target.value })} required /></label><label>Password<input type="password" value={credentials.password} onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} required /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button">Open client manager</button></form></div><style jsx>{styles}</style></main></>

  return <><Head><title>Client Management | Collablit Solutions</title></Head><main className="admin-page"><header><div><p className="kicker">Collablit Solutions / Client portals</p><h1>Keep every client in the loop.</h1><p className="subhead">Update progress and share documents by email.</p></div><div className="actions"><a href="/admin">← Admin dashboard</a><button onClick={async () => { await fetch('/api/admin-auth', { method: 'DELETE' }); setLoggedIn(false) }}>Sign out</button></div></header><AdminClients clients={clients} onUpdated={loadClients} /></main><style jsx>{styles}</style></>
}

const styles = `
  :global(body) { background: #f4f0e9; color: #132b43; }.admin-page { max-width: 1200px; margin: 0 auto; padding: 48px 5vw 70px; }.admin-page header { display: flex; justify-content: space-between; align-items: flex-end; gap: 20px; margin-bottom: 35px; }.kicker { color: #ad702c; font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; margin: 0 0 9px; }.admin-page h1, .login-panel h1 { color: #102e4a; font: 400 clamp(2.3rem, 4vw, 4rem) Georgia, serif; margin: 0; }.subhead, .login-copy { color: #687582; margin: 12px 0 0; }.actions { display: flex; align-items: center; gap: 16px; }.actions a { color: #173b5e; text-decoration: none; font-weight: 700; }.actions button { color: #a16d2b; background: transparent; border: 0; font-weight: 700; cursor: pointer; }.admin-login { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: radial-gradient(circle at top right, #f7e5c7, transparent 40%), #f4f0e9; }.login-panel { width: min(420px, 100%); background: #fff; padding: 45px; border: 1px solid #e6e0d5; border-radius: 8px; box-shadow: 0 25px 60px rgba(23,59,94,.1); }.login-mark { width: 45px; height: 45px; display: grid; place-items: center; border-radius: 50%; background: #173b5e; color: #d39b45; font-weight: 800; }.login-panel h1 { font-size: 2.6rem; margin-top: 25px; }.login-panel form { display: grid; gap: 16px; margin-top: 30px; }.login-panel label { display: grid; gap: 7px; color: #53636e; font-size: .85rem; font-weight: 700; }.login-panel input { width: 100%; border: 1px solid #dfe0dc; border-radius: 4px; padding: 12px; font: inherit; }.primary-button { border: 0; border-radius: 5px; padding: 13px; color: #fff; background: #173b5e; font-weight: 700; cursor: pointer; }.form-error { color: #b65f4d; }
  @media (max-width: 650px) { .admin-page { padding: 30px 16px; }.admin-page header { display: block; }.actions { margin-top: 20px; justify-content: space-between; }.login-panel { padding: 30px 24px; } }
`
