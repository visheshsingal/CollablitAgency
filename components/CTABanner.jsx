// using plain anchors for CTAs so styles apply consistently

export default function CTABanner() {
  return (
    <section className="cta-section">
      <div className="cta-bg" aria-hidden="true">
        <div className="cta-glow" />
        <div className="cta-grid" />
      </div>

      <div className="cta-panel">
        <span className="corner corner--tl" aria-hidden="true" />
        <span className="corner corner--tr" aria-hidden="true" />
        <span className="corner corner--bl" aria-hidden="true" />
        <span className="corner corner--br" aria-hidden="true" />

        <div className="eyebrow">
          <span className="eyebrow-dot" />
          Let&apos;s work together
        </div>

        <h2 className="cta-heading">
          Ready to start <span className="accent">your</span> project?
        </h2>

        <p className="cta-sub">
          We deliver fast, reliable work and clear communication —
          from first call to final launch.
        </p>

        <div className="cta-actions">
          <a href="#contact" className="btn-primary">
            Get in Touch
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="#projects" className="btn-white">See Our Work</a>
        </div>

        <div className="cta-meta">
          <div className="meta-item">
            <span className="meta-dot" />
            Typically respond within 24 hours
          </div>
          <span className="meta-divider" />
          <div className="meta-item">
            <span className="meta-dot" />
            Free project scoping call
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-section {
          position: relative;
          background: #0a1f42;
          padding: 100px 32px;
          overflow: hidden;
        }

        .cta-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 700px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(201, 162, 39, 0.16) 0%, transparent 70%);
          transform: translate(-50%, -50%);
        }

        .cta-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse at center, black 0%, transparent 80%);
        }

        .cta-panel {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
          padding: 72px 56px;
          border: 1px solid rgba(226, 192, 104, 0.18);
          background: rgba(255, 255, 255, 0.015);
          border-radius: 4px;
        }

        .corner {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 1.5px solid #c9a227;
        }

        .corner--tl { top: -1px; left: -1px; border-right: none; border-bottom: none; }
        .corner--tr { top: -1px; right: -1px; border-left: none; border-bottom: none; }
        .corner--bl { bottom: -1px; left: -1px; border-right: none; border-top: none; }
        .corner--br { bottom: -1px; right: -1px; border-left: none; border-top: none; }

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

        .cta-heading {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(30px, 4.2vw, 46px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 18px;
        }

        .accent {
          font-style: italic;
          color: #e2c068;
        }

        .cta-sub {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.62);
          max-width: 460px;
          margin: 0 auto 40px;
        }

        .cta-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .btn-primary {
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

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 34px -8px rgba(201, 162, 39, 0.6);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 8px;
          text-decoration: none;
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .btn-ghost:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.4);
        }

        .btn-white {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 12px 22px;
          border-radius: 8px;
          background: #ffffff;
          color: #0a1f42;
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          text-decoration: none;
          border: 1px solid rgba(11,35,74,0.06);
          box-shadow: 0 10px 30px rgba(11,35,74,0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .btn-white:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px rgba(11,35,74,0.08);
        }

        .cta-meta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.45);
        }

        .meta-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #c9a227;
        }

        .meta-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.15);
        }

        @media (max-width: 640px) {
          .cta-section {
            padding: 70px 20px;
          }
          .cta-panel {
            padding: 48px 24px;
          }
          .cta-actions {
            flex-direction: column;
            width: 100%;
          }
          .btn-primary,
          .btn-ghost {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}