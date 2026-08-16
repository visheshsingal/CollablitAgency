'use client'

import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = ['home','services','projects','faq','contact']
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive('#' + e.target.id)
      })
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 })

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const links = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-ribbon" aria-hidden="true" />

      <nav className="nav-inner" aria-label="Primary">
        <a href="#home" className="brand">
          <span className="mark">
            <span className="mark-letter">C</span>
          </span>
          <span className="brand-text">
            <span className="brand-word">Collablit</span>
          </span>
        </a>

        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`nav-link ${active === l.href ? 'is-active' : ''}`} aria-current={active === l.href ? 'page' : undefined}>
                <span className="nav-link-dot" aria-hidden="true" />
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* client login and CTA removed per request */}

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
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&display=swap');
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

        .nav--scrolled {
          transform: translateY(-1px);
          box-shadow: 0 10px 30px rgba(11, 35, 74, 0.08);
        }

        .nav-ribbon { height: 3px; width: 100%; background: linear-gradient(90deg,#0b234a,#1d4694 38%,#c9a227 78%);} 

        .nav-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .nav--scrolled .nav-inner { padding: 10px 22px; }

        .brand { display:inline-flex; align-items:center; gap:10px; text-decoration:none; }

        .mark { width:34px; height:34px; border-radius:8px; background: linear-gradient(155deg,#0e2a5c,#0b1f42); display:flex;align-items:center;justify-content:center; }
        .mark::after{ content:''; position:absolute; top:0; right:0; width:12px; height:12px; background:linear-gradient(135deg,#e2c068,#c9a227); clip-path:polygon(100% 0,0 0,100% 100%);} 
        .mark-letter{ font-family:'Fraunces',serif; font-style:italic; font-weight:500; font-size:16px; color:#f4d68a }

        .brand-word { font-family:'Fraunces',serif; font-weight:600; font-size:18px; color:#0b234a }
        .brand-tag { font-family:Inter, sans-serif; font-size:9px; letter-spacing:0.12em; color:#b68d40 }

        .nav-links { display:flex; align-items:center; gap:22px; list-style:none; margin:0; padding:0 }

        .nav-link { position:relative; display:inline-flex; align-items:center; gap:6px; font-family:Inter, sans-serif; font-size:12px; font-weight:600; letter-spacing:0.06em; text-transform:uppercase; color:#35405a; padding:6px 0; transition:color 0.22s ease }
        .nav-link-dot{ width:3px; height:3px; border-radius:50%; background:#c9a227; opacity:0; transform:scale(0); transition:all 0.28s cubic-bezier(.34,1.56,.64,1) }
        .nav-link:hover{ color:#0b234a }
        .nav-link:hover .nav-link-dot{ opacity:1; transform:scale(1) }

        .burger { display:none; flex-direction:column; gap:5px; width:28px; height:28px; background:none; border:none; cursor:pointer; }
        .burger span{ width:100%; height:1.5px; background:#0b234a; transition:all 0.3s }

        .mobile-panel { max-height:0; overflow:hidden; background: linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,252,0.98)); transition:max-height 0.36s ease; border-bottom:1px solid rgba(11,35,74,0.04) }
        .mobile-panel--open { max-height:420px }
        .mobile-panel ul{ list-style:none; margin:0; padding:8px 20px 4px; display:flex; flex-direction:column; gap:6px }
        .mobile-panel a{ display:block; padding:12px 0; font-family:Inter, sans-serif; font-size:15px; font-weight:600; color:#0b234a; text-decoration:none; border-bottom:1px solid rgba(11,35,74,0.03) }

        @media (max-width: 900px) {
          .nav-links { display:none }
          .burger { display:flex }
          .nav-inner { padding:12px 14px }
          .brand-tag { display:none }
        }
      `}</style>
    </header>
  )
}