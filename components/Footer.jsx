import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-glow" aria-hidden="true" />

      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand logo-brand">
              <img src="https://plain-apac-prod-public.komododecks.com/202609/07/8eX4Xx73q4wTa2vJrgyB/image.png" alt="Collablit Solutions logo" className="footer-logo" />
            </Link>
            <p className="brand-tagline">
              Development, design, and social media management for brands that
              want to grow on purpose, not by accident.
            </p>
            <div className="social-row">
              <a href="https://www.instagram.com/collablit_?stkn=aG9zMWl3eGs4cnBv" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5.5" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/collablit/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M7.5 10V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  <circle cx="7.5" cy="6.8" r="1.1" fill="currentColor" />
                  <path d="M11.5 17V13.2C11.5 11.5 12.5 10.5 14 10.5C15.5 10.5 16.3 11.5 16.3 13.2V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="https://x.com/Collablit" target="_blank" rel="noreferrer" aria-label="X / Twitter" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M5 4L10.8 12.5L5.1 20H7.5L12.2 14.1L16.5 20H19.5L13.4 11.8L18.5 4H16.1L11.9 9.4L8 4H5Z" fill="currentColor" />
                </svg>
              </a>
              <a href="https://www.youtube.com/@Collablit" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M21.5 8.2C21.5 6.8 20.4 5.7 19 5.7C17.6 5.6 15.3 5.4 12 5.4C8.7 5.4 6.4 5.6 5 5.7C3.6 5.7 2.5 6.8 2.5 8.2V15.8C2.5 17.2 3.6 18.3 5 18.3C6.4 18.4 8.7 18.6 12 18.6C15.3 18.6 17.6 18.4 19 18.3C20.4 18.3 21.5 17.2 21.5 15.8V8.2Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M10 9.2L15.2 12L10 14.8V9.2Z" fill="currentColor" />
                </svg>
              </a>
              <a href="https://t.me/collablit" target="_blank" rel="noreferrer" aria-label="Telegram" className="social-link">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <path d="M21 5L3.5 11.8C3 12 2.9 12.8 3.5 13L7.8 14.4L9.5 19.2C9.7 19.8 10.6 20 11 19.5L13.3 16.5L18.1 20.3C18.8 20.7 19.6 20.2 19.8 19.4L21 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9.5 14.3L20.4 5.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h4>Navigate</h4>
              <Link href="/">Home</Link>
              <Link href="/testimonials">Testimonials</Link>
              <Link href="/book-meeting">Book a Meeting</Link>
            </div>

            <div className="link-group">
              <h4>Services</h4>
              <a href="#services">Web Development</a>
              <a href="#services">Design</a>
              <a href="#services">Social Media</a>
            </div>

            <div className="link-group">
              <h4>Contact</h4>
              <a href="mailto:team@collablit.com">team@collablit.com</a>
              <a href="tel:+919024939664">+91 90249 39664</a>
              <Link href="/book-meeting">Book a meeting →</Link>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="bottom-left">
            <p className="copyright">© {year} Collablit Solutions. All rights reserved.</p>
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
              <path d="M7 11V3M3 6.5L7 2.5L11 6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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

        .logo-brand {
          margin-bottom: 18px;
        }

        .footer-logo {
          display: block;
          height: 42px;
          width: auto;
          max-width: 240px;
          object-fit: contain;
          filter: brightness(0) invert(1);
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