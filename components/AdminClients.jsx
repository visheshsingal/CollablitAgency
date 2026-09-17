import { useEffect, useState } from 'react'

export default function AdminClients({ clients = [], onUpdated }) {
  const [selectedEmail, setSelectedEmail] = useState('')
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [document, setDocument] = useState({ name: '', url: '', description: '' })
  const [message, setMessage] = useState('')
  const selected = clients.find((client) => client.email === selectedEmail) || clients[0]

  useEffect(() => {
    if (selected) {
      setSelectedEmail(selected.email)
      setStatus(selected.status || 'Onboarding')
      setProgress(selected.progress || 0)
    }
  }, [selected])

  const updateClient = async (event) => {
    event.preventDefault()
    setMessage('')
    const response = await fetch('/api/admin-data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'update-client', email: selected.email, status, progress }) })
    setMessage(response.ok ? 'Client progress updated.' : 'Could not update client.')
    if (response.ok) onUpdated()
  }

  const addDocument = async (event) => {
    event.preventDefault()
    setMessage('')
    const response = await fetch('/api/admin-data', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'add-document', email: selected.email, document }) })
    setMessage(response.ok ? 'Document shared with client.' : 'Could not share document.')
    if (response.ok) {
      setDocument({ name: '', url: '', description: '' })
      onUpdated()
    }
  }

  if (!clients.length) return <section className="client-admin-panel"><p className="admin-kicker">Client workspace</p><h2>Client accounts</h2><p className="client-empty">Accounts appear here after a client books a meeting.</p><style jsx>{styles}</style></section>

  return <section className="client-admin-panel"><div className="admin-panel-heading"><div><p className="admin-kicker">Client workspace</p><h2>Manage client portals</h2></div><select value={selected?.email || ''} onChange={(event) => setSelectedEmail(event.target.value)}>{clients.map((client) => <option value={client.email} key={client.email}>{client.name || client.email} · {client.company || 'No company'}</option>)}</select></div><div className="client-admin-grid"><div className="client-summary"><strong>{selected?.name || 'Client'}</strong><span>{selected?.email}</span><span>{selected?.company || 'Company not provided'}</span><div className="client-doc-count">{selected?.documents?.length || 0} shared documents</div></div><form className="client-update-form" onSubmit={updateClient}><label>Status<input value={status} onChange={(event) => setStatus(event.target.value)} placeholder="e.g. In production" required /></label><label>Progress: {progress}%<input type="range" min="0" max="100" value={progress} onChange={(event) => setProgress(event.target.value)} /></label><button>Update portal</button></form><form className="client-update-form document-form" onSubmit={addDocument}><strong>Share a document</strong><input placeholder="Document name" value={document.name} onChange={(event) => setDocument({ ...document, name: event.target.value })} required /><input type="url" placeholder="Document URL" value={document.url} onChange={(event) => setDocument({ ...document, url: event.target.value })} required /><input placeholder="Short description" value={document.description} onChange={(event) => setDocument({ ...document, description: event.target.value })} /><button>Share document</button></form></div>{message && <p className="admin-message">{message}</p>}<div className="shared-docs">{selected?.documents?.map((item) => <span key={`${item.name}-${item.url}`}>{item.name}</span>)}</div><style jsx>{styles}</style></section>
}

const styles = `
  .client-admin-panel { background: rgba(255,255,255,.75); border: 1px solid rgba(23,59,94,.1); border-radius: 8px; padding: 24px; margin-bottom: 14px; }.admin-panel-heading { display: flex; justify-content: space-between; align-items: flex-start; gap: 20px; margin-bottom: 22px; }.admin-kicker { color: #ad702c; font-size: 11px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; margin: 0 0 9px; }.client-admin-panel h2 { color: #173b5e; font: 400 1.65rem Georgia, serif; margin: 0; }.admin-panel-heading select { max-width: 340px; border: 1px solid #dfe0dc; border-radius: 4px; padding: 11px; background: #fff; color: #173b5e; font: inherit; }.client-admin-grid { display: grid; grid-template-columns: .8fr 1fr 1.2fr; gap: 14px; }.client-summary, .client-update-form { background: #f7f6f1; border: 1px solid #e6e4dc; border-radius: 5px; padding: 16px; }.client-summary { display: grid; align-content: start; gap: 6px; color: #87918e; font-size: .82rem; }.client-summary strong { color: #173b5e; font-size: 1rem; }.client-doc-count { color: #21835d; margin-top: 12px; font-weight: 700; }.client-update-form { display: grid; gap: 10px; }.client-update-form label { display: grid; gap: 6px; color: #687582; font-size: .82rem; font-weight: 700; }.client-update-form input { width: 100%; border: 1px solid #dfe0dc; border-radius: 4px; padding: 10px; background: #fff; color: #173b5e; font: inherit; }.client-update-form input[type='range'] { accent-color: #d39b45; padding: 0; }.client-update-form button { border: 0; border-radius: 4px; padding: 11px; background: #173b5e; color: #fff; font-weight: 700; cursor: pointer; }.document-form strong { color: #173b5e; }.admin-message { color: #21835d; font-size: .85rem; margin: 16px 0 0; }.shared-docs { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 15px; }.shared-docs span { background: #e7f2ed; color: #21835d; border-radius: 20px; padding: 6px 10px; font-size: .75rem; }.client-empty { color: #87918e; }
  @media (max-width: 900px) { .client-admin-grid { grid-template-columns: 1fr 1fr; }.client-summary { grid-column: 1 / -1; }.admin-panel-heading { display: block; }.admin-panel-heading select { margin-top: 12px; width: 100%; max-width: none; } } @media (max-width: 600px) { .client-admin-grid { grid-template-columns: 1fr; } }
`
