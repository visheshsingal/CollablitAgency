export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="mark">
                <span className="mark-letter">C</span>
              </span>
              <span className="brand-word">Collablit</span>
            </a>
            <p className="brand-tagline">
              Development, design, and social media management for brands that
              want to grow on purpose, not by accident.
            </p>
            <div className="social-row">
              <a href="#" aria-label="Instagram" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8"/>
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8"/>
                  <path d="M7.5 10V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="7.5" cy="6.8" r="1.1" fill="currentColor"/>
                  <path d="M11.5 17V13.2C11.5 11.5 12.5 10.5 14 10.5C15.5 10.5 16.3 11.5 16.3 13.2V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter / X" className="social-link">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3L21 21M21 3L3 21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Navigate</h4>
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#faq">FAQ</a>
            </div>

            <div className="link-group">
              <h4>Services</h4>
              <a href="#services">Web Development</a>
              <a href="#services">Design</a>
              <a href="#services">Social Media</a>
            </div>

            <div className="link-group">
              <h4>Contact</h4>
              <a href="mailto:support@collablit.com">support@collablit.com</a>
              <a href="tel:+919024939664">+91 90249 39664</a>
              <a href="#contact">Send a message →</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="bottom-left">
            <p className="copyright">© {year} Collablit. All rights reserved.</p>
            <div className="bottom-links">
              <a href="#privacy">Privacy Policy</a>
              <span className="dot" aria-hidden="true" />
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
          <button
            className="to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 11V3M3 6.5L7 2.5L11 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .site-footer {
          position: relative;
          background: #0a1f42;
          padding: 80px 32px 32px;
          overflow: hidden;
        }

        .footer-glow {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 500px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(201, 162, 39, 0.1) 0%, transparent 70%);
          z-index: 0;
        }

        .footer-inner {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }

        .footer-top {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 64px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 20px;
        }

        .mark {
          position: relative;
          width: 34px;
          height: 34px;
          flex-shrink: 0;
          background: linear-gradient(155deg, #1d4694 0%, #0e2a5c 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .mark::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 13px;
          height: 13px;
          background: linear-gradient(135deg, #e2c068, #c9a227);
          clip-path: polygon(100% 0, 0 0, 100% 100%);
        }

        .mark-letter {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 16px;
          color: #f4d68a;
        }

        .brand-word {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 20px;
          letter-spacing: -0.02em;
          color: #ffffff;
        }

        .brand-tagline {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.5);
          max-width: 320px;
          margin: 0 0 28px;
        }

        .social-row {
          display: flex;
          gap: 10px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }

        .social-link:hover {
          background: #c9a227;
          border-color: #c9a227;
          color: #0a1f42;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
        }

        .link-group {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .link-group h4 {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #e2c068;
          margin: 0 0 6px;
        }

        .link-group :global(a) {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          transition: color 0.25s ease;
          width: fit-content;
        }

        .link-group :global(a:hover) {
          color: #ffffff;
        }

        .footer-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          padding-top: 28px;
          flex-wrap: wrap;
        }

        .bottom-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .copyright {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.4);
          margin: 0;
          text-align: left;
        }

        .bottom-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .bottom-links :global(a) {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .bottom-links :global(a:hover) {
          color: #ffffff;
        }

        .dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.25);
        }

        .to-top {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: none;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease, transform 0.25s ease;
        }

        .to-top:hover {
          background: #c9a227;
          border-color: #c9a227;
          color: #0a1f42;
          transform: translateY(-2px);
        }

        @media (max-width: 860px) {
          .footer-top {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-links {
            grid-template-columns: repeat(2, 1fr);
            gap: 28px;
          }
        }

        @media (max-width: 560px) {
          .site-footer {
            padding: 56px 20px 24px;
          }
          .footer-links {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
          }
          .to-top {
            align-self: flex-end;
            margin-top: -36px;
          }
        }
      `}</style>
    </footer>
  )
}