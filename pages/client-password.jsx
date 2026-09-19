import { useState } from 'react'
import ClientPortal from '../components/ClientPortal.jsx'

export default function ClientPasswordPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const updatePassword = async (event) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (form.newPassword !== form.confirmPassword) {
      setError('New password and confirmation do not match.')
      return
    }

    setSaving(true)
    try {
      const response = await fetch('/api/client-auth', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        setError(result.message || 'Could not update your password.')
        return
      }
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setMessage('Your password has been updated successfully.')
    } catch {
      setError('Could not update your password right now.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <ClientPortal title="Change Password | Collablit Solutions" kicker="Account Security">
      <section className="password-page">
        <div className="page-intro">
          <span className="eyebrow">Account security</span>
          <h2>Change your password</h2>
          <p>Keep your client workspace protected with a password only you know.</p>
        </div>

        <form className="password-card" onSubmit={updatePassword}>
          {message && <div className="feedback success">{message}</div>}
          {error && <div className="feedback error">{error}</div>}

          <label>
            Current password
            <input
              type="password"
              autoComplete="current-password"
              value={form.currentPassword}
              onChange={(event) => setForm({ ...form, currentPassword: event.target.value })}
              required
            />
          </label>
          <label>
            New password
            <input
              type="password"
              autoComplete="new-password"
              minLength="8"
              value={form.newPassword}
              onChange={(event) => setForm({ ...form, newPassword: event.target.value })}
              required
            />
            <small>Use at least 8 characters.</small>
          </label>
          <label>
            Confirm new password
            <input
              type="password"
              autoComplete="new-password"
              minLength="8"
              value={form.confirmPassword}
              onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })}
              required
            />
          </label>

          <button type="submit" disabled={saving}>
            {saving ? 'Updating password...' : 'Update password'}
          </button>
        </form>

        <style jsx>{`
          .password-page {
            max-width: 760px;
            margin: 0 auto;
          }
          .page-intro {
            margin-bottom: 22px;
          }
          .eyebrow {
            color: #ad702c;
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 0.12em;
            text-transform: uppercase;
          }
          h2 {
            margin: 8px 0 6px;
            color: #0d253f;
            font-size: 1.8rem;
          }
          .page-intro p {
            margin: 0;
            color: #64748b;
          }
          .password-card {
            display: grid;
            gap: 17px;
            max-width: 540px;
            padding: 26px;
            background: #fff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(13, 37, 63, 0.05);
          }
          label {
            display: grid;
            gap: 7px;
            color: #26384e;
            font-size: 0.82rem;
            font-weight: 700;
          }
          input {
            width: 100%;
            box-sizing: border-box;
            padding: 12px 13px;
            border: 1px solid #cbd5e1;
            border-radius: 8px;
            color: #0f172a;
            font: inherit;
            outline: none;
          }
          input:focus {
            border-color: #ad702c;
            box-shadow: 0 0 0 3px rgba(173, 112, 44, 0.12);
          }
          small {
            color: #64748b;
            font-weight: 400;
          }
          button {
            margin-top: 4px;
            padding: 12px 16px;
            border: 0;
            border-radius: 8px;
            background: #0d253f;
            color: #fff;
            font: inherit;
            font-weight: 700;
            cursor: pointer;
          }
          button:disabled {
            cursor: wait;
            opacity: 0.65;
          }
          .feedback {
            padding: 11px 13px;
            border-radius: 8px;
            font-size: 0.88rem;
            font-weight: 600;
          }
          .success {
            background: #ecfdf5;
            border: 1px solid #a7f3d0;
            color: #065f46;
          }
          .error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #991b1b;
          }
          @media (max-width: 640px) {
            .password-card {
              padding: 20px;
            }
          }
        `}</style>
      </section>
    </ClientPortal>
  )
}
