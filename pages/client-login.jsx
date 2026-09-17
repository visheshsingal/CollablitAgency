import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function ClientLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')
    const response = await fetch('/api/client-auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    const result = await response.json()
    if (!response.ok) {
      setError(result.message || 'Unable to sign in.')
      setLoading(false)
      return
    }
    window.location.href = '/client-dashboard'
  }

  return <><Head><title>Client Login | Collablit Solutions</title></Head><main className="client-login"><div className="login-card"><Link href="/" className="back-link">← Collablit Solutions</Link><p className="eyebrow">Private client portal</p><h1>Welcome back.</h1><p className="intro">Sign in to follow your project, meetings, and shared documents.</p><form onSubmit={submit}><label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="username" required /></label><label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" required /></label>{error && <p className="error">{error}</p>}<button disabled={loading}>{loading ? 'Signing in...' : 'Open my dashboard'}</button></form><p className="help">Your login details are sent to the email used when you book a meeting.</p></div></main><style jsx>{styles}</style></>
}

const styles = `
  .client-login { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: radial-gradient(circle at top right, #f6e3c6, transparent 42%), #f4f0e9; color: #173b5e; }
  .login-card { width: min(450px, 100%); background: #fff; padding: 42px; border: 1px solid #e4ddd1; border-radius: 8px; box-shadow: 0 24px 60px rgba(23,59,94,.1); }
  .back-link { color: #173b5e; font-weight: 700; text-decoration: none; }.eyebrow { color: #a16d2b; font-size: .72rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; margin: 50px 0 12px; }.login-card h1 { font: 400 3rem Georgia, serif; margin: 0; }.intro, .help { color: #71808b; line-height: 1.65; }.login-card form { display: grid; gap: 16px; margin-top: 28px; }.login-card label { display: grid; gap: 7px; color: #53636e; font-size: .86rem; font-weight: 700; }.login-card input { width: 100%; border: 1px solid #dfe0dc; border-radius: 4px; padding: 13px; font: inherit; color: #173b5e; }.login-card button { border: 0; border-radius: 4px; background: #173b5e; color: #fff; padding: 14px; font: inherit; font-weight: 700; cursor: pointer; }.login-card button:disabled { opacity: .6; cursor: wait; }.error { color: #b65f4d; margin: 0; font-size: .88rem; }.help { font-size: .8rem; margin: 24px 0 0; }
  @media (max-width: 520px) { .login-card { padding: 28px 22px; }.login-card h1 { font-size: 2.4rem; } }
`
