import { useEffect, useState } from 'react'

export default function AdminClients({ clients = [], onUpdated }) {
  const [selectedEmail, setSelectedEmail] = useState('')
  const [status, setStatus] = useState('')
  const [progress, setProgress] = useState(0)
  const [document, setDocument] = useState({ name: '', url: '', description: '' })
  const [message, setMessage] = useState('')
  const [updating, setUpdating] = useState(false)
  const [docLoading, setDocLoading] = useState(false)

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
    setUpdating(true)
    const response = await fetch('/api/admin-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update-client', email: selected.email, status, progress }),
    })
    setUpdating(false)
    setMessage(response.ok ? 'Client progress updated successfully.' : 'Could not update client.')
    if (response.ok) onUpdated()
  }

  const addDocument = async (event) => {
    event.preventDefault()
    setMessage('')
    setDocLoading(true)
    const response = await fetch('/api/admin-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'add-document', email: selected.email, document }),
    })
    setDocLoading(false)
    setMessage(response.ok ? 'Document added and shared with client.' : 'Could not share document.')
    if (response.ok) {
      setDocument({ name: '', url: '', description: '' })
      onUpdated()
    }
  }

  if (!clients.length) {
    return (
      <section className="empty-panel">
        <div className="empty-content">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
          <h3>No Client Portals Active</h3>
          <p>When a prospective client books a meeting or gets onboarded, their workspace account will appear here automatically.</p>
        </div>
        <style jsx>{`
          .empty-panel {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 60px 24px;
            text-align: center;
          }
          .empty-content {
            max-width: 420px;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }
          .empty-content h3 {
            margin: 0;
            color: #0d253f;
            font-size: 1.25rem;
          }
          .empty-content p {
            margin: 0;
            color: #64748b;
            font-size: 0.9rem;
            line-height: 1.5;
          }
        `}</style>
      </section>
    )
  }

  return (
    <section className="client-admin-panel">
      {/* Top Selector Bar */}
      <div className="panel-bar">
        <div className="bar-title">
          <span className="bar-tag">ACTIVE SELECTION</span>
          <h3>Select Client Workspace</h3>
        </div>
        <div className="select-wrap">
          <select
            value={selected?.email || ''}
            onChange={(e) => setSelectedEmail(e.target.value)}
            className="client-select"
          >
            {clients.map((c) => (
              <option value={c.email} key={c.email}>
                {c.name || c.email} {c.company ? `(${c.company})` : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {message && (
        <div className="feedback-banner">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{message}</span>
        </div>
      )}

      {/* Grid of details and forms */}
      <div className="portal-grid">
        {/* Client Profile Card */}
        <div className="card profile-card">
          <div className="profile-header">
            <div className="avatar-initial">
              {(selected?.name || 'C').charAt(0).toUpperCase()}
            </div>
            <div>
              <strong className="profile-name">{selected?.name || 'Client Name'}</strong>
              <span className="profile-email">{selected?.email}</span>
            </div>
          </div>

          <div className="meta-list">
            <div className="meta-row">
              <span>Company:</span>
              <strong>{selected?.company || 'Not Specified'}</strong>
            </div>
            <div className="meta-row">
              <span>Current Status:</span>
              <span className="stage-chip">{selected?.status || 'Onboarding'}</span>
            </div>
            <div className="meta-row">
              <span>Milestone:</span>
              <strong>{selected?.progress || 0}% Complete</strong>
            </div>
          </div>

          <div className="progress-preview">
            <div className="preview-bar" style={{ width: `${selected?.progress || 0}%` }} />
          </div>

          <div className="doc-summary-badge">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
            <span>{selected?.documents?.length || 0} shared documents in portal</span>
          </div>
        </div>

        {/* Update Progress Form */}
        <div className="card form-card">
          <div className="card-heading">
            <span className="card-kicker">WORKFLOW DISPATCH</span>
            <h4>Update Stage & Progress</h4>
          </div>

          <form onSubmit={updateClient} className="action-form">
            <div className="field">
              <label>Current Project Stage</label>
              <input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                placeholder="e.g. In Discovery, Wireframing, In Production, Completed"
                required
              />
            </div>

            <div className="field">
              <div className="slider-label">
                <label>Overall Completion</label>
                <span className="progress-number">{progress}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="progress-slider"
              />
            </div>

            <button type="submit" className="save-btn" disabled={updating}>
              {updating ? 'Saving...' : 'Save Stage & Progress'}
            </button>
          </form>
        </div>

        {/* Share Document Form */}
        <div className="card form-card">
          <div className="card-heading">
            <span className="card-kicker">DELIVERABLES & DOCS</span>
            <h4>Share Document Link</h4>
          </div>

          <form onSubmit={addDocument} className="action-form">
            <div className="field">
              <label>Document Title</label>
              <input
                placeholder="e.g. Scope of Work, Figma Design, Sprint 1 Deliverable"
                value={document.name}
                onChange={(e) => setDocument({ ...document, name: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label>Resource URL</label>
              <input
                type="url"
                placeholder="https://drive.google.com/... or https://figma.com/..."
                value={document.url}
                onChange={(e) => setDocument({ ...document, url: e.target.value })}
                required
              />
            </div>

            <div className="field">
              <label>Brief Description (Optional)</label>
              <input
                placeholder="e.g. Review and provide sign-off"
                value={document.description}
                onChange={(e) => setDocument({ ...document, description: e.target.value })}
              />
            </div>

            <button type="submit" className="save-btn doc-btn" disabled={docLoading}>
              {docLoading ? 'Attaching...' : 'Attach & Share Document'}
            </button>
          </form>
        </div>
      </div>

      {/* Shared Documents Shelf */}
      {selected?.documents?.length > 0 && (
        <div className="card docs-shelf">
          <div className="shelf-header">
            <h4>Documents currently available to {selected?.name || 'this client'}</h4>
            <span className="doc-count">{selected.documents.length} Files</span>
          </div>
          <div className="docs-list">
            {selected.documents.map((doc, idx) => (
              <div className="doc-item" key={`${doc.name}-${idx}`}>
                <div className="doc-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="doc-text">
                  <strong>{doc.name}</strong>
                  {doc.description && <small>{doc.description}</small>}
                </div>
                <a href={doc.url} target="_blank" rel="noreferrer" className="open-doc-btn">
                  Open ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .client-admin-panel {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .panel-bar {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 18px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .bar-tag {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ad702c;
          text-transform: uppercase;
        }

        .bar-title h3 {
          margin: 4px 0 0;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0d253f;
        }

        .client-select {
          padding: 10px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #0f172a;
          background: #fff;
          outline: none;
          min-width: 320px;
        }

        .feedback-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          border-radius: 8px;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .portal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 18px;
        }

        .card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 22px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .card-heading {
          margin-bottom: 16px;
        }

        .card-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #ad702c;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .card-heading h4 {
          margin: 0;
          font-size: 1.05rem;
          font-weight: 700;
          color: #0d253f;
        }

        /* Profile Card */
        .profile-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .avatar-initial {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #0d253f;
          color: #d39b45;
          font-size: 1.15rem;
          font-weight: 800;
          display: grid;
          place-items: center;
        }

        .profile-name {
          display: block;
          font-size: 1rem;
          color: #0f172a;
        }

        .profile-email {
          display: block;
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 2px;
        }

        .meta-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 16px 0;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
        }

        .meta-row span {
          color: #64748b;
        }

        .meta-row strong {
          color: #0f172a;
        }

        .stage-chip {
          background: #f1f5f9;
          color: #1e293b;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.76rem;
          font-weight: 700;
        }

        .progress-preview {
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .preview-bar {
          height: 100%;
          background: #d39b45;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .doc-summary-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #047857;
          background: #ecfdf5;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 600;
        }

        /* Forms */
        .action-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .field label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
        }

        .field input {
          padding: 10px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 7px;
          font-size: 0.88rem;
          color: #0f172a;
          outline: none;
        }

        .field input:focus {
          border-color: #0d253f;
        }

        .slider-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-number {
          font-size: 0.88rem;
          font-weight: 800;
          color: #d39b45;
        }

        .progress-slider {
          accent-color: #d39b45;
          cursor: pointer;
        }

        .save-btn {
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

        .save-btn:hover {
          background: #173b5e;
        }

        .doc-btn {
          background: #166534;
        }

        .doc-btn:hover {
          background: #14532d;
        }

        /* Shelf */
        .docs-shelf {
          margin-top: 4px;
        }

        .shelf-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .shelf-header h4 {
          margin: 0;
          font-size: 1rem;
          font-weight: 700;
          color: #0d253f;
        }

        .doc-count {
          font-size: 0.75rem;
          font-weight: 700;
          background: #f1f5f9;
          padding: 3px 9px;
          border-radius: 12px;
          color: #475569;
        }

        .docs-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 12px;
        }

        .doc-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
        }

        .doc-icon {
          color: #d39b45;
          flex-shrink: 0;
        }

        .doc-text {
          flex: 1;
          overflow: hidden;
        }

        .doc-text strong {
          display: block;
          font-size: 0.86rem;
          color: #0f172a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .doc-text small {
          display: block;
          font-size: 0.74rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        .open-doc-btn {
          font-size: 0.8rem;
          font-weight: 700;
          color: #0369a1;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 4px;
          background: #e0f2fe;
          flex-shrink: 0;
        }

        .open-doc-btn:hover {
          background: #bae6fd;
        }

        @media (max-width: 1080px) {
          .portal-grid {
            grid-template-columns: 1fr;
          }
          .panel-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .client-select {
            width: 100%;
            min-width: 0;
          }
        }
      `}</style>
    </section>
  )
}
