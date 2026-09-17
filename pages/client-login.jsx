import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'

export default function ClientLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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

  return <><Head><title>Client Login | Collablit Solutions</title></Head><main className="client-login"><div className="login-card"><Link href="/" className="back-link">← Collablit Solutions</Link><p className="eyebrow">Private client portal</p><h1>Welcome back.</h1><p className="intro">Sign in to follow your project, meetings, and shared documents.</p><form onSubmit={submit}><label>Email address<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} autoComplete="username" required /></label><label>Password<div className="password-field"><input type={showPassword ? 'text' : 'password'} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} autoComplete="current-password" required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button></div></label>{error && <p className="error">{error}</p>}<button disabled={loading}>{loading ? 'Signing in...' : 'Open my dashboard'}</button></form><p className="help">Your login details are sent to the email used when you book a meeting.</p></div></main><style jsx>{styles}</style></>
}

const styles = `
  .client-login { min-height: 100vh; display: grid; place-items: center; padding: 24px; background: linear-gradient(115deg, rgba(8,29,53,.94), rgba(12,48,80,.78)), url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=2000') center/cover; color: #173b5e; }
  .login-card { width: min(450px, 100%); background: rgba(255,255,255,.96); padding: 42px; border: 1px solid rgba(211,155,69,.55); border-radius: 10px; box-shadow: 0 24px 70px rgba(0,0,0,.3); }.login-card::before { content: ''; display: block; width: 170px; height: 54px; margin-bottom: 24px; background: url('https://plain-apac-prod-public.komododecks.com/202609/07/8eX4Xx73q4wTa2vJrgyB/image.png') left center / contain no-repeat; }
  .back-link { color: #173b5e; font-weight: 700; text-decoration: none; }.eyebrow { color: #a16d2b; font-size: .72rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; margin: 50px 0 12px; }.login-card h1 { font: 400 3rem Georgia, serif; margin: 0; }.intro, .help { color: #71808b; line-height: 1.65; }.login-card form { display: grid; gap: 16px; margin-top: 28px; }.login-card label { display: grid; gap: 7px; color: #53636e; font-size: .86rem; font-weight: 700; }.login-card input { width: 100%; border: 1px solid #dfe0dc; border-radius: 4px; padding: 13px; font: inherit; color: #173b5e; }.password-field { display: flex; border: 1px solid #dfe0dc; border-radius: 4px; overflow: hidden; }.password-field input { border: 0; border-radius: 0; }.password-field button { border-radius: 0; padding: 0 12px; background: #f4f0e9; color: #173b5e; font-size: .8rem; }.login-card > form > button { border: 0; border-radius: 4px; background: #173b5e; color: #fff; padding: 14px; font: inherit; font-weight: 700; cursor: pointer; }.login-card button:disabled { opacity: .6; cursor: wait; }.error { color: #b65f4d; margin: 0; font-size: .88rem; }.help { font-size: .8rem; margin: 24px 0 0; }
  @media (max-width: 520px) { .login-card { padding: 28px 22px; }.login-card h1 { font-size: 2.4rem; } }
`
