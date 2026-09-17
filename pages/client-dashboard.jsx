import { useEffect, useState } from 'react'
import Head from 'next/head'
import ClientLayout from '../components/ClientLayout.jsx'

const dateLabel = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

export default function ClientDashboardPage() {
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

  const { client, booking } = data
  const completedStepsCount = (client.processSteps || []).filter(
    (s) => s.status === 'complete'
  ).length

  return (
    <>
      <Head>
        <title>{client.company || 'Client'} Workspace | Collablit Solutions</title>
      </Head>

      <ClientLayout client={client} booking={booking} onLogout={logout}>
        <div className="client-canvas-wrapper" id="overview">
          {/* Welcome Hero Banner */}
          <section className="welcome-banner">
            <div className="welcome-copy">
              <span className="welcome-tag">COLLABLIT CLIENT SPACE</span>
              <h1>Welcome back, {client.name || 'there'}.</h1>
              <p>
                Track live progress on your agency engagement with <strong>Collablit Solutions</strong>.
                All project documents, milestones, and meeting links are centralized here.
              </p>
            </div>

            <div className="progress-card">
              <div className="progress-top">
                <span className="progress-title">Project Progress</span>
                <span className="progress-val">{client.progress || 0}%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(100, Math.max(0, client.progress || 0))}%` }}
                />
              </div>
              <div className="progress-footer">
                <span>Stage: <strong>{client.status || 'Onboarding'}</strong></span>
                <span>{completedStepsCount} of {(client.processSteps || []).length || 4} steps complete</span>
              </div>
            </div>
          </section>

          {/* Quick Metrics Strip */}
          <section className="metrics-strip">
            <div className="metric-box">
              <span className="box-label">CURRENT PHASE</span>
              <strong className="box-val">{client.status || 'Onboarding'}</strong>
              <small className="box-sub">Active Milestone</small>
            </div>
            <div className="metric-box">
              <span className="box-label">SHARED FILES</span>
              <strong className="box-val">{(client.documents || []).length}</strong>
              <small className="box-sub">Deliverables & briefs</small>
            </div>
            <div className="metric-box">
              <span className="box-label">NEXT CONVERSATION</span>
              <strong className="box-val text-gold">
                {booking?.meetingDate ? booking.meetingDate : 'Upcoming'}
              </strong>
              <small className="box-sub">{booking?.meetingTime || 'Slot TBD'}</small>
            </div>
          </section>

          {/* Main 2-Column Dashboard Grid */}
          <div className="content-grid">
            {/* Left Main Column */}
            <div className="primary-column">
              {/* Project Journey Section */}
              <section className="panel" id="process">
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">WORKFLOW TIMELINE</span>
                    <h3>Project Journey & Milestones</h3>
                  </div>
                  <span className="status-indicator">
                    {client.status || 'Active Journey'}
                  </span>
                </div>

                <div className="steps-timeline">
                  {(client.processSteps || []).map((step, index) => {
                    const isComplete = step.status === 'complete'
                    const isCurrent = step.status === 'current'
                    return (
                      <div
                        className={`timeline-step ${step.status}`}
                        key={step.key || index}
                      >
                        <div className="step-marker">
                          {isComplete ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          ) : isCurrent ? (
                            <span className="active-dot" />
                          ) : (
                            <span className="step-num">{index + 1}</span>
                          )}
                        </div>
                        <div className="step-content">
                          <div className="step-heading-row">
                            <strong>{step.label}</strong>
                            <span className={`step-badge badge-${step.status}`}>
                              {isComplete
                                ? 'Completed'
                                : isCurrent
                                ? 'In Progress'
                                : 'Upcoming'}
                            </span>
                          </div>
                          <p className="step-desc">
                            {isComplete
                              ? 'Deliverables reviewed and approved by both teams.'
                              : isCurrent
                              ? 'Currently active sprint with regular updates.'
                              : 'Queued for execution upon previous milestone completion.'}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Shared Documents Section */}
              <section className="panel" id="documents">
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">DELIVERABLES REPOSITORY</span>
                    <h3>Shared Documents & Files</h3>
                  </div>
                  <span className="count-pill">
                    {(client.documents || []).length} Available
                  </span>
                </div>

                {client.documents?.length ? (
                  <div className="documents-grid">
                    {client.documents.map((doc) => (
                      <a
                        className="doc-card"
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        key={`${doc.name}-${doc.url}`}
                      >
                        <div className="doc-type-icon">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                            <line x1="16" y1="13" x2="8" y2="13" />
                            <line x1="16" y1="17" x2="8" y2="17" />
                          </svg>
                        </div>
                        <div className="doc-details">
                          <strong className="doc-name">{doc.name}</strong>
                          <span className="doc-desc">
                            {doc.description || 'Shared by Collablit Solutions'}
                          </span>
                          <span className="doc-meta">
                            Added {dateLabel(doc.addedAt)}
                          </span>
                        </div>
                        <span className="open-arrow">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <line x1="7" y1="17" x2="17" y2="7" />
                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state-box">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <strong>Your project files will appear here</strong>
                    <p>
                      We will upload design drafts, project proposals, specifications, and
                      final handoffs as the engagement progresses.
                    </p>
                  </div>
                )}
              </section>
            </div>

            {/* Right Aside Column */}
            <div className="side-column">
              {/* Meeting Card */}
              <section className="panel side-panel" id="meetings">
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">SYNC SESSION</span>
                    <h3>Next Meeting</h3>
                  </div>
                  <span className="calendar-icon">📅</span>
                </div>

                {booking ? (
                  <div className="meeting-content">
                    <div className="meeting-date-banner">
                      <strong className="date-main">
                        {booking.meetingDate || 'To be scheduled'}
                      </strong>
                      <span className="time-sub">
                        {booking.meetingTime || 'Time slot TBD'} · {booking.duration || '30 mins'}
                      </span>
                    </div>

                    <div className="meeting-specs">
                      <div className="spec-item">
                        <span>Meeting Agenda:</span>
                        <strong>{booking.agenda || 'Project Review & Alignment'}</strong>
                      </div>
                      <div className="spec-item">
                        <span>Format:</span>
                        <strong>Google Meet Video Conference</strong>
                      </div>
                    </div>

                    {booking.meetLink ? (
                      <a
                        className="join-meet-btn"
                        href={booking.meetLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        Join Video Call
                      </a>
                    ) : (
                      <div className="link-pending">
                        <span>Video link will be added prior to the call.</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="meeting-empty">
                    <p>No upcoming meetings scheduled right now.</p>
                  </div>
                )}
              </section>

              {/* Support & Contact Team */}
              <section className="panel side-panel" id="contact">
                <div className="panel-header">
                  <div>
                    <span className="panel-kicker">DIRECT SUPPORT</span>
                    <h3>Agency Contact</h3>
                  </div>
                </div>

                <div className="contact-card-body">
                  <div className="contact-person">
                    <div className="person-avatar">VS</div>
                    <div>
                      <strong>Vishesh Singal</strong>
                      <small>Principal · Collablit Solutions</small>
                    </div>
                  </div>

                  <p className="contact-copy">
                    Have questions about your project scope, deliverables, or timeline? Reach out anytime.
                  </p>

                  <a
                    href="mailto:vishesh.singal.contact@gmail.com"
                    className="email-team-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Send an Email
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>

        <style jsx>{styles}</style>
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
    background: #f7f6f2;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  .state-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 40px;
    text-align: center;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .state-card h2 {
    margin: 0;
    color: #0d253f;
    font-size: 1.4rem;
  }
  .state-card p {
    margin: 0;
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
  }
  .state-btn {
    margin-top: 8px;
    background: #0d253f;
    color: #fff;
    border: 0;
    padding: 10px 18px;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
  }
  .spinner {
    width: 34px;
    height: 34px;
    border: 3px solid #cbd5e1;
    border-top-color: #0d253f;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .error-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fee2e2;
    color: #dc2626;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 1.2rem;
  }
`

const styles = `
  .client-canvas-wrapper {
    max-width: 1360px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  /* Welcome Banner */
  .welcome-banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: linear-gradient(135deg, #0d253f 0%, #173b5e 100%);
    color: #ffffff;
    padding: 30px 34px;
    border-radius: 14px;
    box-shadow: 0 4px 20px rgba(13, 37, 63, 0.12);
    gap: 28px;
  }

  .welcome-copy {
    flex: 1;
  }

  .welcome-tag {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.14em;
    color: #d39b45;
    text-transform: uppercase;
    display: block;
    margin-bottom: 8px;
  }

  .welcome-copy h1 {
    margin: 0 0 10px;
    font-size: 1.85rem;
    font-weight: 700;
    color: #ffffff;
  }

  .welcome-copy p {
    margin: 0;
    font-size: 0.92rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.78);
    max-width: 620px;
  }

  .welcome-copy strong {
    color: #fff;
  }

  .progress-card {
    width: 320px;
    flex-shrink: 0;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 10px;
    padding: 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .progress-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .progress-title {
    font-size: 0.8rem;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .progress-val {
    font-size: 1.3rem;
    font-weight: 800;
    color: #d39b45;
  }

  .progress-track {
    height: 8px;
    background: rgba(255, 255, 255, 0.16);
    border-radius: 4px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #d39b45 0%, #e8b76c 100%);
    border-radius: 4px;
    transition: width 0.5s ease;
  }

  .progress-footer {
    display: flex;
    justify-content: space-between;
    font-size: 0.74rem;
    color: rgba(255, 255, 255, 0.65);
  }

  .progress-footer strong {
    color: #fff;
  }

  /* Metrics Strip */
  .metrics-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .metric-box {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 18px 22px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  }

  .box-label {
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #64748b;
    text-transform: uppercase;
  }

  .box-val {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin: 6px 0 2px;
  }

  .text-gold {
    color: #ad702c;
  }

  .box-sub {
    font-size: 0.78rem;
    color: #94a3b8;
  }

  /* Content Grid */
  .content-grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 20px;
    align-items: start;
  }

  .primary-column, .side-column {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

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
    margin-bottom: 22px;
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

  .status-indicator {
    font-size: 0.75rem;
    font-weight: 700;
    color: #0d253f;
    background: #f1f5f9;
    padding: 4px 10px;
    border-radius: 20px;
  }

  .count-pill {
    font-size: 0.75rem;
    font-weight: 700;
    color: #047857;
    background: #ecfdf5;
    padding: 4px 10px;
    border-radius: 20px;
  }

  /* Timeline */
  .steps-timeline {
    display: flex;
    flex-direction: column;
  }

  .timeline-step {
    display: flex;
    gap: 16px;
    position: relative;
    padding-bottom: 24px;
  }

  .timeline-step:not(:last-child)::after {
    content: '';
    position: absolute;
    left: 15px;
    top: 32px;
    bottom: 0;
    width: 2px;
    background: #e2e8f0;
  }

  .timeline-step.complete:not(:last-child)::after {
    background: #10b981;
  }

  .step-marker {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    background: #f1f5f9;
    border: 2px solid #cbd5e1;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 700;
    z-index: 2;
  }

  .timeline-step.complete .step-marker {
    background: #10b981;
    border-color: #10b981;
    color: #fff;
  }

  .timeline-step.current .step-marker {
    background: #0d253f;
    border-color: #d39b45;
    color: #fff;
    box-shadow: 0 0 0 3px rgba(211, 155, 69, 0.25);
  }

  .active-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d39b45;
  }

  .step-content {
    flex: 1;
  }

  .step-heading-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .step-heading-row strong {
    font-size: 0.95rem;
    color: #0f172a;
  }

  .step-badge {
    font-size: 0.72rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 12px;
    text-transform: uppercase;
  }

  .badge-complete {
    background: #dcfce7;
    color: #166534;
  }

  .badge-current {
    background: #fef3c7;
    color: #92400e;
  }

  .badge-upcoming {
    background: #f1f5f9;
    color: #64748b;
  }

  .step-desc {
    margin: 4px 0 0;
    font-size: 0.82rem;
    color: #64748b;
    line-height: 1.45;
  }

  /* Documents */
  .documents-grid {
    display: grid;
    gap: 10px;
  }

  .doc-card {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.16s ease;
  }

  .doc-card:hover {
    border-color: #d39b45;
    background: #fffdfa;
    transform: translateX(3px);
  }

  .doc-type-icon {
    color: #d39b45;
    flex-shrink: 0;
  }

  .doc-details {
    flex: 1;
    overflow: hidden;
  }

  .doc-name {
    display: block;
    font-size: 0.9rem;
    color: #0d253f;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .doc-desc {
    display: block;
    font-size: 0.78rem;
    color: #64748b;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }

  .doc-meta {
    display: block;
    font-size: 0.72rem;
    color: #94a3b8;
    margin-top: 2px;
  }

  .open-arrow {
    color: #94a3b8;
    flex-shrink: 0;
    transition: color 0.15s ease;
  }

  .doc-card:hover .open-arrow {
    color: #ad702c;
  }

  .empty-state-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 36px 20px;
    gap: 10px;
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    border-radius: 8px;
  }

  .empty-state-box strong {
    color: #0f172a;
    font-size: 0.95rem;
  }

  .empty-state-box p {
    margin: 0;
    font-size: 0.82rem;
    color: #64748b;
    max-width: 380px;
    line-height: 1.5;
  }

  /* Meeting Card */
  .meeting-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .meeting-date-banner {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 16px;
    text-align: center;
  }

  .date-main {
    display: block;
    font-size: 1.25rem;
    color: #0d253f;
  }

  .time-sub {
    display: block;
    font-size: 0.8rem;
    color: #64748b;
    margin-top: 4px;
  }

  .meeting-specs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    border-top: 1px solid #f1f5f9;
    padding-top: 12px;
  }

  .spec-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.82rem;
  }

  .spec-item span {
    color: #64748b;
  }

  .spec-item strong {
    color: #0f172a;
  }

  .join-meet-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #173b5e;
    color: #fff;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 700;
    transition: background 0.16s ease;
  }

  .join-meet-btn:hover {
    background: #0d253f;
  }

  .link-pending {
    text-align: center;
    font-size: 0.8rem;
    color: #94a3b8;
    padding: 10px;
  }

  .meeting-empty {
    text-align: center;
    color: #94a3b8;
    font-size: 0.88rem;
    padding: 24px 0;
  }

  /* Contact Card */
  .contact-card-body {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .contact-person {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .person-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #0d253f;
    color: #d39b45;
    font-weight: 800;
    font-size: 0.88rem;
    display: grid;
    place-items: center;
  }

  .contact-person strong {
    display: block;
    font-size: 0.92rem;
    color: #0f172a;
  }

  .contact-person small {
    display: block;
    font-size: 0.74rem;
    color: #64748b;
  }

  .contact-copy {
    margin: 0;
    font-size: 0.84rem;
    color: #64748b;
    line-height: 1.5;
  }

  .email-team-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    color: #0d253f;
    padding: 11px;
    border-radius: 8px;
    text-decoration: none;
    font-size: 0.86rem;
    font-weight: 700;
    transition: all 0.16s ease;
  }

  .email-team-btn:hover {
    background: #edf2f7;
    border-color: #94a3b8;
  }

  /* Responsive Breakpoints */
  @media (max-width: 1080px) {
    .content-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    .welcome-banner {
      flex-direction: column;
      align-items: flex-start;
    }
    .progress-card {
      width: 100%;
    }
    .metrics-strip {
      grid-template-columns: 1fr;
    }
  }
`
