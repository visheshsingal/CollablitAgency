import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import BrandLogo from './BrandLogo.jsx'

export default function AdminLayout({
  children,
  title = 'Overview',
  kicker = 'Admin Operations',
  onRefresh,
  onLogout,
  loading = false,
}) {
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    {
      href: '/admin',
      label: 'Dashboard Overview',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      ),
    },
    {
      href: '/admin-leads',
      label: 'Leads & Inquiries',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: '/admin-finance',
      label: 'Finance & Ledger',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      ),
    },
    {
      href: '/admin-clients',
      label: 'Client Portals',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
    },
  ]

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="admin-shell">
      {/* Mobile Overlay */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={closeMobile} />}

      {/* Left Sidebar */}
      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-top">
          <div className="logo-box">
            <BrandLogo compact />
          </div>
          <div className="badge-kicker">
            <span className="dot" />
            Operations Command
          </div>
        </div>

        <nav className="sidebar-menu">
          <p className="menu-group-label">MAIN NAVIGATION</p>
          {navItems.map((item) => {
            const isActive = router.pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`menu-link ${isActive ? 'active' : ''}`}
                onClick={closeMobile}
              >
                <span className="icon-wrap">{item.icon}</span>
                <span className="link-text">{item.label}</span>
                {isActive && <span className="active-pill" />}
              </Link>
            )
          })}

          <p className="menu-group-label" style={{ marginTop: '24px' }}>QUICK ACTIONS</p>
          <Link href="/" target="_blank" className="menu-link sub-link">
            <span className="icon-wrap">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </span>
            <span className="link-text">Public Website</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="profile-avatar">AD</div>
            <div className="profile-meta">
              <strong>Admin Team</strong>
              <small>Collablit Core</small>
            </div>
          </div>
          {onLogout && (
            <button className="sidebar-logout-btn" onClick={onLogout} title="Sign out of operations">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span>Sign out</span>
            </button>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-body">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="mobile-toggle"
              aria-label="Toggle navigation menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="topbar-breadcrumb">
              <span className="breadcrumb-kicker">{kicker}</span>
              <h1 className="breadcrumb-title">{title}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="live-status-pill">
              <span className="live-pulse" />
              <span className="live-text">Live System</span>
            </div>

            {onRefresh && (
              <button
                className="topbar-btn refresh-btn"
                onClick={onRefresh}
                disabled={loading}
                title="Refresh dashboard data"
              >
                <svg
                  className={loading ? 'spinning' : ''}
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            )}

            {onLogout && (
              <button className="topbar-btn signout-btn" onClick={onLogout}>
                Sign out
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="admin-content-canvas">
          {children}
        </main>
      </div>

      <style jsx>{`
        .admin-shell {
          display: flex;
          min-height: 100vh;
          background: #f4f6fa;
          color: #102e4a;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
        }

        /* Sidebar Styling */
        .admin-sidebar {
          width: 260px;
          flex-shrink: 0;
          background: #0d253f;
          color: #fff;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 80;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 2px 0 18px rgba(10, 30, 50, 0.12);
        }

        .sidebar-top {
          padding: 24px 20px 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .logo-box :global(.brand-logo) {
          display: block;
          width: 140px;
          height: 38px;
          object-fit: contain;
          object-position: left center;
          filter: brightness(0) invert(1);
        }

        .badge-kicker {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #d39b45;
          background: rgba(211, 155, 69, 0.12);
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(211, 155, 69, 0.25);
        }

        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d39b45;
          box-shadow: 0 0 6px #d39b45;
        }

        .sidebar-menu {
          flex: 1;
          padding: 20px 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .menu-group-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.42);
          margin: 0 0 8px 10px;
        }

        .menu-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.75);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.18s ease;
          position: relative;
        }

        .menu-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.09);
        }

        .menu-link.active {
          color: #fff;
          background: #173b5e;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        }

        .sub-link {
          color: rgba(255, 255, 255, 0.6);
        }

        .icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d39b45;
        }

        .active-pill {
          margin-left: auto;
          width: 5px;
          height: 14px;
          background: #d39b45;
          border-radius: 3px;
        }

        .sidebar-footer {
          padding: 16px 14px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          background: rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .admin-profile {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 8px;
        }

        .profile-avatar {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #d39b45;
          color: #0d253f;
          font-weight: 800;
          font-size: 0.82rem;
          display: grid;
          place-items: center;
        }

        .profile-meta strong {
          display: block;
          font-size: 0.84rem;
          color: #fff;
        }

        .profile-meta small {
          display: block;
          font-size: 0.72rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .sidebar-logout-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.75);
          padding: 9px 12px;
          border-radius: 7px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .sidebar-logout-btn:hover {
          background: rgba(220, 53, 69, 0.18);
          border-color: rgba(220, 53, 69, 0.4);
          color: #ff8c8c;
        }

        /* Admin Body */
        .admin-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow-x: hidden;
        }

        /* Topbar */
        .admin-topbar {
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

        .topbar-breadcrumb {
          display: flex;
          flex-direction: column;
        }

        .breadcrumb-kicker {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #ad702c;
        }

        .breadcrumb-title {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0d253f;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          color: #065f46;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.76rem;
          font-weight: 700;
        }

        .live-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.6); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
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
          transition: all 0.16s ease;
          border: 1px solid #d5dbe5;
          background: #fff;
          color: #173b5e;
        }

        .topbar-btn:hover {
          background: #f1f4f8;
          border-color: #cbd3e0;
        }

        .signout-btn {
          color: #946527;
          border-color: #ebdcc4;
          background: #faf6f0;
        }

        .signout-btn:hover {
          background: #f5eedf;
          color: #7b4f17;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Content Canvas */
        .admin-content-canvas {
          padding: 30px 32px 60px;
          flex: 1;
        }

        /* Mobile Breakpoints */
        @media (max-width: 960px) {
          .admin-sidebar {
            position: fixed;
            left: -280px;
            transition: left 0.25s ease;
            box-shadow: none;
          }

          .admin-sidebar.open {
            left: 0;
            box-shadow: 6px 0 25px rgba(0, 0, 0, 0.35);
          }

          .sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(13, 37, 63, 0.6);
            backdrop-filter: blur(4px);
            z-index: 75;
          }

          .mobile-toggle {
            display: flex;
          }

          .admin-topbar {
            padding: 0 18px;
            height: 64px;
          }

          .admin-content-canvas {
            padding: 20px 16px 40px;
          }
        }

        @media (max-width: 580px) {
          .live-status-pill {
            display: none;
          }

          .breadcrumb-title {
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  )
}
