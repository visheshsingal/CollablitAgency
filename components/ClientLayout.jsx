import { useState } from 'react'
import Link from 'next/link'
import BrandLogo from './BrandLogo.jsx'

export default function ClientLayout({
  children,
  client = {},
  booking = null,
  onLogout,
}) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('overview')

  const clientName = client?.name || 'Client'
  const companyName = client?.company || 'Project Workspace'
  const clientInitial = clientName.charAt(0).toUpperCase()
  const status = client?.status || 'Onboarding'

  const navItems = [
    {
      id: 'overview',
      href: '#overview',
      label: 'Workspace Overview',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'process',
      href: '#process',
      label: 'Project Journey',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      id: 'documents',
      href: '#documents',
      label: 'Shared Documents',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
    },
    {
      id: 'meetings',
      href: '#meetings',
      label: 'Meeting & Schedule',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'contact',
      href: '#contact',
      label: 'Support & Contact',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ]

  const handleNavClick = (id) => {
    setActiveSection(id)
    setMobileOpen(false)
  }

  return (
    <div className="client-shell">
      {/* Mobile Backdrop */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />}

      {/* Left Sidebar */}
      <aside className={`client-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-box">
            <BrandLogo />
          </div>
          <div className="portal-pill">Client Portal</div>
        </div>

        {/* Client User Info Card */}
        <div className="client-account-card">
          <div className="account-avatar">{clientInitial}</div>
          <div className="account-details">
            <strong className="account-name" title={clientName}>{clientName}</strong>
            <span className="account-company" title={companyName}>{companyName}</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <span className="nav-heading">NAVIGATION</span>
          {navItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                {isActive && <span className="nav-indicator" />}
              </a>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <Link href="/" className="public-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Collablit Agency
          </Link>
          <button className="logout-button" onClick={onLogout}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="client-body">
        {/* Top Navbar */}
        <header className="client-topbar">
          <div className="topbar-left">
            <button
              className="mobile-toggle"
              aria-label="Toggle navigation drawer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="topbar-title-group">
              <span className="topbar-kicker">Collablit Solutions · Client Workspace</span>
              <h2 className="topbar-title">{companyName}</h2>
            </div>
          </div>

          <div className="topbar-right">
            <div className="status-badge">
              <span className="status-dot" />
              <span>Stage: <strong>{status}</strong></span>
            </div>

            {booking?.meetLink && (
              <a
                href={booking.meetLink}
                target="_blank"
                rel="noreferrer"
                className="topbar-btn meet-btn"
                title="Join Google Meet session"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
                <span>Join Meet</span>
              </a>
            )}

            <button className="topbar-btn signout-link" onClick={onLogout}>
              Sign out
            </button>
          </div>
        </header>

        {/* Scrollable Main Content */}
        <main className="client-canvas">
          {children}
        </main>
      </div>

      <style jsx>{`
        .client-shell {
          display: flex;
          min-height: 100vh;
          background: #f7f6f2;
          color: #132b43;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Sidebar */
        .client-sidebar {
          width: 260px;
          flex-shrink: 0;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 80;
          box-shadow: 2px 0 16px rgba(0, 0, 0, 0.04);
        }

        .sidebar-header {
          padding: 24px 20px 18px;
          border-bottom: 1px solid #f0f2f5;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .logo-box :global(.brand-logo) {
          display: block;
          width: 145px;
          height: 38px;
          object-fit: contain;
          object-position: left center;
        }

        .portal-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ad702c;
          background: #fef7ec;
          border: 1px solid #f9e2ba;
          padding: 3px 10px;
          border-radius: 20px;
          align-self: flex-start;
        }

        /* Client account card */
        .client-account-card {
          margin: 16px 14px 8px;
          padding: 12px 14px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .account-avatar {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: #173b5e;
          color: #fff;
          font-weight: 800;
          font-size: 0.95rem;
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .account-details {
          overflow: hidden;
        }

        .account-name {
          display: block;
          font-size: 0.86rem;
          color: #102e4a;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .account-company {
          display: block;
          font-size: 0.74rem;
          color: #64748b;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Nav */
        .sidebar-nav {
          flex: 1;
          padding: 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          overflow-y: auto;
        }

        .nav-heading {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #94a3b8;
          margin: 6px 0 8px 10px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 12px;
          border-radius: 7px;
          color: #475569;
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.16s ease;
          position: relative;
        }

        .nav-item:hover {
          color: #102e4a;
          background: #f1f5f9;
        }

        .nav-item.active {
          color: #173b5e;
          background: #edf3f8;
          font-weight: 700;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          color: #ad702c;
        }

        .nav-indicator {
          margin-left: auto;
          width: 4px;
          height: 14px;
          background: #ad702c;
          border-radius: 2px;
        }

        /* Footer */
        .sidebar-footer {
          padding: 16px 14px;
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .public-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          color: #64748b;
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 6px;
          transition: color 0.15s ease;
        }

        .public-link:hover {
          color: #102e4a;
        }

        .logout-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          border: 1px solid #fed7aa;
          background: #fffaf0;
          color: #9a3412;
          padding: 9px 12px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .logout-button:hover {
          background: #ffedd5;
          color: #7c2d12;
        }

        /* Body & Content */
        .client-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
        }

        /* Topbar */
        .client-topbar {
          position: sticky;
          top: 0;
          z-index: 50;
          height: 70px;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e3e7ee;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: 0;
          color: #102e4a;
          cursor: pointer;
          padding: 4px;
        }

        .topbar-title-group {
          display: flex;
          flex-direction: column;
        }

        .topbar-kicker {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ad702c;
        }

        .topbar-title {
          margin: 0;
          font-size: 1.22rem;
          font-weight: 700;
          color: #102e4a;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          border-radius: 20px;
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          font-size: 0.78rem;
          color: #334155;
        }

        .status-badge strong {
          color: #0f172a;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }

        .topbar-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: 6px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.16s ease;
          border: 1px solid #d5dbe5;
          background: #fff;
          color: #173b5e;
        }

        .topbar-btn:hover {
          background: #f1f4f8;
        }

        .meet-btn {
          background: #173b5e;
          border-color: #173b5e;
          color: #fff;
        }

        .meet-btn:hover {
          background: #0d253f;
        }

        .signout-link {
          color: #946527;
          border-color: #ebdcc4;
          background: #faf6f0;
        }

        .signout-link:hover {
          background: #f5eedf;
        }

        /* Canvas */
        .client-canvas {
          padding: 30px 32px 60px;
          flex: 1;
        }

        /* Mobile Breakpoints */
        @media (max-width: 960px) {
          .client-sidebar {
            position: fixed;
            left: -280px;
            transition: left 0.25s ease;
            box-shadow: none;
          }

          .client-sidebar.open {
            left: 0;
            box-shadow: 6px 0 25px rgba(0, 0, 0, 0.25);
          }

          .sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(15, 23, 42, 0.55);
            backdrop-filter: blur(4px);
            z-index: 75;
          }

          .mobile-toggle {
            display: flex;
          }

          .client-topbar {
            padding: 0 18px;
            height: 64px;
          }

          .client-canvas {
            padding: 20px 16px 40px;
          }
        }

        @media (max-width: 600px) {
          .status-badge {
            display: none;
          }

          .topbar-title {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  )
}
