import { useEffect, useState } from 'react'
import Head from 'next/head'
import ClientLayout from './ClientLayout.jsx'
import { workspaceStyles } from './ClientWorkspace.jsx'

export default function ClientPortal({
  title,
  kicker = 'Collablit Client Hub',
  children,
}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/client-data')
      .then(async (response) => {
        const result = await response.json()
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = '/client-login'
            return
          }
          throw new Error(result.message || 'Unable to load your dashboard.')
        }
        setData(result)
      })
      .catch((loadError) => setError(loadError.message))
  }, [])

  const logout = async () => {
    await fetch('/api/client-auth', { method: 'DELETE' })
    window.location.href = '/client-login'
  }

  if (error) {
    return (
      <main className="state-screen">
        <div className="state-card">
          <div className="state-icon error-icon">!</div>
          <h2>Workspace Unavailable</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="state-btn">
            Try Again
          </button>
        </div>
        <style jsx>{stateStyles}</style>
      </main>
    )
  }

  if (!data) {
    return (
      <main className="state-screen">
        <div className="state-card">
          <div className="spinner" />
          <h2>Loading Your Workspace</h2>
          <p>Preparing project milestones and shared documents...</p>
        </div>
        <style jsx>{stateStyles}</style>
      </main>
    )
  }

  const pageTitle = title || `${data.client?.company || 'Client'} Workspace | Collablit Solutions`

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <ClientLayout
        client={data.client}
        booking={data.booking}
        onLogout={logout}
        kicker={kicker}
      >
        {typeof children === 'function' ? children(data) : children}
        <style jsx global>{workspaceStyles}</style>
      </ClientLayout>
    </>
  )
}

const stateStyles = `
  .state-screen {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: #f7f4ee;
    color: #0b234a;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .state-card {
    background: #fff;
    border: 1px solid #eadfcd;
    border-radius: 16px;
    padding: 42px 36px;
    text-align: center;
    max-width: 420px;
    box-shadow: 0 18px 40px rgba(11, 35, 74, 0.08);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
  }
  .state-card h2 {
    margin: 0;
    color: #0b234a;
    font-family: 'Averia Serif Libre', Georgia, serif;
    font-size: 1.45rem;
    font-weight: 700;
  }
  .state-card p {
    margin: 0;
    color: #5c6b7e;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .state-btn {
    margin-top: 8px;
    background: #0b234a;
    color: #fff;
    border: 0;
    padding: 11px 22px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
  }
  .state-btn:hover {
    background: #16345f;
  }
  .spinner {
    width: 38px;
    height: 38px;
    border: 3px solid #eadfcd;
    border-top-color: #c9a227;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .error-icon {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(239, 68, 68, 0.16);
    border: 1px solid rgba(239, 68, 68, 0.35);
    color: #b91c1c;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 1.3rem;
  }
`
