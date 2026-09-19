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
      badge: 'Main',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      ),
    },
    {
      href: '/admin-leads',
      label: 'Leads & Inquiries',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      href: '/admin-finance',
      label: 'Finance & Ledger',
      icon: (
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="6" x2="12" y2="18" />
          <path d="M15 9.5a2.5 2.5 0 0 0-5 0c0 1.5 1.5 2.5 3 3s3 1.5 3 3a2.5 2.5 0 0 1-5 0" />
        </svg>
      ),
    },
  ]

  const closeMobile = () => setMobileOpen(false)

  return (
    <div className="admin-shell">
      {/* Mobile Overlay */}
      {mobileOpen && <div className="sidebar-backdrop" onClick={closeMobile} />}

      {/* Modern Redesigned Left Sidebar */}
      <aside className={`admin-sidebar ${mobileOpen ? 'open' : ''}`}>
        {/* Glow ambient background element */}
        <div className="sidebar-glow-accent" />

        {/* Brand Header */}
        <div className="sidebar-header">
          <div className="logo-box">
            <BrandLogo compact />
          </div>
          <div className="brand-badge-row">
            <span className="live-indicator">
              <span className="live-dot" />
            </span>
            <span className="brand-tag">Operations Console</span>
          </div>
        </div>

        {/* Navigation List - Only 3 requested items */}
        <div className="nav-container">
          <div className="nav-group-title">
            <span>MAIN NAVIGATION</span>
          </div>

          <nav className="nav-list">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-item ${isActive ? 'is-active' : ''}`}
                  onClick={closeMobile}
                >
                  <div className={`nav-icon-box ${isActive ? 'icon-active' : ''}`}>
                    {item.icon}
                  </div>
                  <span className="nav-label-text">{item.label}</span>
                  {isActive && <div className="active-glow-pill" />}
                  {item.badge && !isActive && (
                    <span className="nav-badge">{item.badge}</span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer / Profile Card */}
        <div className="sidebar-bottom-panel">
          <div className="admin-user-card">
            <div className="user-avatar-wrap">
              <div className="user-avatar">
                <span>AD</span>
              </div>
              <span className="avatar-status-dot" />
            </div>
            <div className="user-info">
              <strong className="user-name">Admin Operations</strong>
              <span className="user-role">Super Admin</span>
            </div>
          </div>

          {onLogout && (
            <button className="signout-action-btn" onClick={onLogout} title="Sign out of panel">
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

        /* Modern Premium Sidebar */
        .admin-sidebar {
          width: 270px;
          flex-shrink: 0;
          background: #091726;
          color: #fff;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 80;
          border-right: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 4px 0 24px rgba(5, 14, 25, 0.25);
          overflow: hidden;
        }

        /* Ambient glow for depth */
        .sidebar-glow-accent {
          position: absolute;
          top: -60px;
          left: -40px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(211, 155, 69, 0.12) 0%, rgba(13, 37, 63, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* Header Section */
        .sidebar-header {
          position: relative;
          z-index: 1;
          padding: 26px 22px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%);
        }

        .logo-box :global(.brand-logo) {
          display: block;
          width: 145px;
          height: 38px;
          object-fit: contain;
          object-position: left center;
          filter: brightness(0) invert(1);
          transition: transform 0.2s ease;
        }

        .logo-box:hover :global(.brand-logo) {
          transform: scale(1.02);
        }

        .brand-badge-row {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          margin-top: 12px;
          background: rgba(211, 155, 69, 0.08);
          border: 1px solid rgba(211, 155, 69, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .live-indicator {
          display: flex;
          align-items: center;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #d39b45;
          box-shadow: 0 0 8px #d39b45;
        }

        .brand-tag {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #e2ad5c;
        }

        /* Navigation List */
        .nav-container {
          position: relative;
          z-index: 1;
          flex: 1;
          padding: 22px 14px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .nav-group-title {
          padding: 0 10px 10px;
        }

        .nav-group-title span {
          font-size: 0.67rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
        }

        .nav-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .nav-link-item {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 11px 14px;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.72);
          text-decoration: none;
          font-size: 0.88rem;
          font-weight: 600;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          border: 1px solid transparent;
        }

        .nav-link-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.06);
          transform: translateX(2px);
        }

        .nav-link-item.is-active {
          color: #ffffff;
          background: linear-gradient(90deg, rgba(211, 155, 69, 0.16) 0%, rgba(23, 59, 94, 0.35) 100%);
          border-color: rgba(211, 155, 69, 0.28);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.22);
        }

        .nav-icon-box {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.65);
          transition: all 0.2s ease;
        }

        .nav-link-item:hover .nav-icon-box {
          background: rgba(211, 155, 69, 0.12);
          color: #e2ad5c;
        }

        .icon-active {
          background: rgba(211, 155, 69, 0.22) !important;
          color: #d39b45 !important;
          box-shadow: 0 0 10px rgba(211, 155, 69, 0.25);
        }

        .nav-label-text {
          flex: 1;
          letter-spacing: 0.01em;
        }

        .active-glow-pill {
          width: 4px;
          height: 18px;
          border-radius: 4px;
          background: #d39b45;
          box-shadow: 0 0 8px #d39b45;
        }

        .nav-badge {
          font-size: 0.68rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.45);
          background: rgba(255, 255, 255, 0.06);
          padding: 2px 7px;
          border-radius: 6px;
        }

        /* Sidebar Bottom Panel */
        .sidebar-bottom-panel {
          position: relative;
          z-index: 1;
          padding: 16px 14px 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.22);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .admin-user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
        }

        .user-avatar-wrap {
          position: relative;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: linear-gradient(135deg, #d39b45 0%, #ad702c 100%);
          color: #091726;
          font-weight: 800;
          font-size: 0.84rem;
          display: grid;
          place-items: center;
          box-shadow: 0 2px 8px rgba(211, 155, 69, 0.3);
        }

        .avatar-status-dot {
          position: absolute;
          bottom: -1px;
          right: -1px;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #10b981;
          border: 2px solid #091726;
        }

        .user-info {
          overflow: hidden;
        }

        .user-name {
          display: block;
          font-size: 0.84rem;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          display: block;
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 1px;
        }

        .signout-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.7);
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .signout-action-btn:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.35);
          color: #fca5a5;
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
            left: -290px;
            transition: left 0.25s ease;
            box-shadow: none;
          }

          .admin-sidebar.open {
            left: 0;
            box-shadow: 6px 0 25px rgba(0, 0, 0, 0.45);
          }

          .sidebar-backdrop {
            position: fixed;
            inset: 0;
            background: rgba(9, 23, 38, 0.65);
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
