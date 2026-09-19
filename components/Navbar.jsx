'use client'

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import BrandLogo from './BrandLogo.jsx'

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Projects' },
    { href: '/testimonials', label: 'Testimonials' },
    { href: '/book-meeting', label: 'Book a Meeting' },
  ]

  const clientLogin = { href: '/client-login', label: 'Client Login' }

  const isActive = (href) => {
    if (href === '/') {
      return router.pathname === '/'
    }
    return router.pathname === href || router.asPath.startsWith(`${href}/`)
  }

  return (
    <header className="nav">
      <div className="nav-ribbon" aria-hidden="true" />

      <nav className="nav-inner" aria-label="Primary">
        <Link href="/" className="brand" aria-label="Collablit Solutions home">
          <BrandLogo navbar />
        </Link>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className={`nav-link ${l.href === '/book-meeting' ? 'nav-link-cta' : ''} ${isActive(l.href) ? 'is-active' : ''}`} aria-current={isActive(l.href) ? 'page' : undefined}>
                {l.href !== '/book-meeting' && <span className="nav-link-dot" aria-hidden="true" />}
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={clientLogin.href}
          className={`client-login-cta ${isActive(clientLogin.href) ? 'is-active' : ''}`}
          aria-current={isActive(clientLogin.href) ? 'page' : undefined}
        >
          <span className="client-login-icon" aria-hidden="true">↗</span>
          {clientLogin.label}
        </Link>

        <button
          className={`burger ${menuOpen ? 'burger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div className={`mobile-panel ${menuOpen ? 'mobile-panel--open' : ''}`}>
        <ul>
          {links.map((l) => (
            <li key={l.href}>
              <Link className={l.href === '/book-meeting' ? 'mobile-link-cta' : ''} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
            </li>
          ))}
          <li>
            <Link className="mobile-client-login" href={clientLogin.href} onClick={() => setMenuOpen(false)}>
              {clientLogin.label}
            </Link>
          </li>
        </ul>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@400;700&display=swap');
      `}</style>

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: linear-gradient(135deg, rgba(255,255,255,0.6), rgba(245,249,255,0.38));
          backdrop-filter: blur(10px) saturate(1.05);
          -webkit-backdrop-filter: blur(10px) saturate(1.05);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 6px 22px rgba(11, 35, 74, 0.06);
          transition: box-shadow 0.28s ease, transform 0.2s ease;
        }

        .nav-ribbon { height: 3px; width: 100%; background: linear-gradient(90deg,#0b234a,#1d4694 38%,#c9a227 78%); }

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          border-radius: 9999px;
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .brand { display:inline-flex; align-items:center; text-decoration:none; }
        .brand :global(.brand-logo) {
          display: block;
          height: 38px !important;
          width: auto;
          max-width: 170px !important;
          object-fit: contain;
          filter: drop-shadow(0 5px 10px rgba(11, 35, 74, 0.08));
        }

        .nav-links { display:flex; align-items:center; gap:22px; list-style:none; margin:0; padding:0 }

        .nav-link { position:relative; display:inline-flex; align-items:center; gap:6px; font-family:'Averia Serif Libre', Georgia, serif; font-size:12px; font-weight:600; letter-spacing:0.06em; color:#35405a; padding:6px 0; transition:color 0.22s ease; text-decoration:none; }
        .nav-link-dot{ width:3px; height:3px; border-radius:50%; background:#c9a227; opacity:0; transform:scale(0); transition:all 0.28s cubic-bezier(.34,1.56,.64,1) }
        .nav-link:hover{ color:#0b234a }
        .nav-link:hover .nav-link-dot{ opacity:1; transform:scale(1) }
        .nav-link-cta { color:#fff; background:#0b234a; border-radius:7px; padding:11px 16px; box-shadow:0 7px 16px rgba(11,35,74,0.16); }
        .nav-link-cta:hover, .nav-link-cta.is-active { color:#fff; background:#1d4694; transform:translateY(-1px); box-shadow:0 9px 20px rgba(11,35,74,0.22); }

        .client-login-cta { display:inline-flex; align-items:center; gap:8px; color:#0b234a; background:#fff; border:1px solid #c9a227; border-radius:7px; padding:10px 14px; font-family:'Averia Serif Libre', Georgia, serif; font-size:12px; font-weight:700; letter-spacing:0.04em; text-decoration:none; box-shadow:0 5px 14px rgba(11,35,74,0.08); transition:background 0.22s ease, color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease; }
        .client-login-cta:hover, .client-login-cta.is-active { color:#fff; background:#0b234a; transform:translateY(-1px); box-shadow:0 8px 18px rgba(11,35,74,0.18); }
        .client-login-icon { color:#c9a227; font-size:15px; line-height:1; }

        .burger { display:none; flex-direction:column; gap:5px; width:28px; height:28px; background:none; border:none; cursor:pointer; }
        .burger span{ width:100%; height:1.5px; background:#0b234a; transition:all 0.3s }

        .mobile-panel { max-height:0; overflow:hidden; background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,252,0.98)); transition:max-height 0.36s ease; border-bottom:1px solid rgba(11,35,74,0.04) }
        .mobile-panel--open { max-height:420px }
        .mobile-panel ul{ list-style:none; margin:0; padding:8px 20px 4px; display:flex; flex-direction:column; gap:6px }
        .mobile-panel a{ display:block; padding:12px 0; font-family:'Averia Serif Libre', Georgia, serif; font-size:15px; font-weight:600; color:#0b234a; text-decoration:none; border-bottom:1px solid rgba(11,35,74,0.03) }
        .mobile-panel a.mobile-link-cta { color:#fff; background:#0b234a; border:0; border-radius:7px; text-align:center; margin:6px 0 8px; padding:13px 16px; }
        .mobile-panel a.mobile-link-cta:hover { background:#1d4694; }
        .mobile-panel a.mobile-client-login { color:#0b234a; border:1px solid #c9a227; border-radius:7px; text-align:center; margin:6px 0 2px; padding:12px 16px; }
        .mobile-panel a.mobile-client-login:hover { color:#fff; background:#0b234a; }

        @media (max-width: 900px) {
          .nav-links { display:none }
          .client-login-cta { display:none }
          .burger { display:flex }
          .nav-inner {
            padding: 12px 14px;
            margin: 0 14px;
            width: calc(100% - 28px);
          }
        }
      `}</style>
    </header>
  )
}