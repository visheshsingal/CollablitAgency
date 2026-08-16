'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const words = ['Social', 'Design', 'Development']
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="glow glow--gold" />
        <div className="glow glow--blue" />
        <div className="grid-overlay" />
      </div>

      <div className="hero-inner">
        {/* eyebrow banner removed per request */}

        <h1 className="headline">
          Where{' '}
          <span className="rotator">
            {words.map((w, i) => (
              <span key={w} className={`rotator-word ${i === index ? 'is-active' : ''}`}>
                {w}
              </span>
            ))}
          </span>
          <br />
          becomes growth.
        </h1>

        <p className="lead">
          Collablit partners with ambitious brands to plan, design, and build
          the digital presence that gets them noticed — and keeps them growing.
        </p>

        <div className="hero-actions">
          <a href="#services" className="btn">
            Our Services
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#contact" className="btn secondary">Contact Us</a>
        </div>

        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">120+</span>
            <span className="stat-label">Projects Shipped</span>
          </div>
          <span className="stat-divider" />
          <div className="stat">
            <span className="stat-num">40+</span>
            <span className="stat-label">Brands Partnered</span>
          </div>
          <span className="stat-divider" />
          <div className="stat">
            <span className="stat-num">6 Yrs</span>
            <span className="stat-label">Avg. Client Tenure</span>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span className="scroll-line" />
        <span className="scroll-label">Scroll</span>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 92vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #0a1f42;
          padding: 140px 32px 100px;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: radial-gradient(ellipse at 20% 0%, #123568 0%, #0a1f42 55%),
            linear-gradient(180deg, #0a1f42 0%, #08182f 100%);
        }

        .glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.55;
        }

        .glow--gold {
          width: 480px;
          height: 480px;
          top: -140px;
          right: -100px;
          background: radial-gradient(circle, #c9a227 0%, transparent 70%);
          animation: drift1 16s ease-in-out infinite alternate;
        }

        .glow--blue {
          width: 560px;
          height: 560px;
          bottom: -220px;
          left: -160px;
          background: radial-gradient(circle, #1d4694 0%, transparent 70%);
          animation: drift2 18s ease-in-out infinite alternate;
        }

        @keyframes drift1 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(-40px, 30px) scale(1.1); }
        }
        @keyframes drift2 {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(30px, -20px) scale(1.08); }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 75%);
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          max-width: 780px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e2c068;
          background: rgba(201, 162, 39, 0.1);
          border: 1px solid rgba(201, 162, 39, 0.25);
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 28px;
        }

        .eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e2c068;
        }

        .headline {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(40px, 6vw, 68px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 24px;
        }

        .rotator {
          position: relative;
          display: inline-block;
          height: 1.1em;
          vertical-align: bottom;
          overflow: hidden;
        }

        .rotator-word {
          position: absolute;
          left: 0;
          top: 0;
          font-style: italic;
          color: #e2c068;
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        .rotator-word.is-active {
          position: relative;
          opacity: 1;
          transform: translateY(0);
        }

        .lead {
          font-family: 'Inter', sans-serif;
          font-size: 17px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.68);
          max-width: 560px;
          margin: 0 0 40px;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 64px;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 8px;
          text-decoration: none;
          background: linear-gradient(135deg, #e2c068, #c9a227);
          color: #0a1f42;
          box-shadow: 0 10px 30px -10px rgba(201, 162, 39, 0.5);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -8px rgba(201, 162, 39, 0.6);
        }

        .btn.secondary {
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: none;
        }

        .btn.secondary:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .stats-row {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .stat-num {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 26px;
          color: #ffffff;
        }

        .stat-label {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: rgba(255, 255, 255, 0.5);
        }

        .stat-divider {
          width: 1px;
          height: 32px;
          background: rgba(255, 255, 255, 0.14);
        }

        .scroll-cue {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          z-index: 1;
        }

        .scroll-line {
          width: 1px;
          height: 34px;
          background: linear-gradient(180deg, rgba(226, 192, 104, 0.9), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .scroll-label {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        @media (max-width: 640px) {
          .hero {
            padding: 120px 20px 80px;
          }
          .stats-row {
            gap: 18px;
          }
          .stat-num {
            font-size: 21px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}