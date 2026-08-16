export default function WorkPreview() {
  const projects = [
    {
      name: 'FRD Nutrition',
      category: 'E-commerce · D2C',
      desc: 'Full storefront build for a sports nutrition brand — product catalog, checkout flow, and a dark, high-energy visual identity built to convert serious gym buyers.',
      tags: ['Shopify / Custom', 'Product Photography Direction', 'Conversion UX'],
      url: 'https://www.frdnutritionpremium.com/',
      theme: 'dark',
    },
    {
      name: 'Policicue',
      category: 'Corporate · Insurance',
      desc: 'A trust-first web presence for a group insurance provider — clear plan comparisons and enterprise-grade credibility for HR decision-makers.',
      tags: ['Corporate Website', 'Content Structure', 'Lead Generation'],
      url: 'https://www.policicue.com/',
      theme: 'light',
    },
  ]

  return (
    <section id="projects" className="work-section">
      <div className="work-inner">
        <div className="work-head">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Selected Work
          </div>
          <h2 className="heading">
            Projects we&apos;re <span className="heading-accent">proud</span> of
          </h2>
          <p className="sub">
            A look at how we adapt — same craft, different brand worlds.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((p, i) => (
            <article key={p.name} className={`project-row ${i % 2 === 1 ? 'reverse' : ''}`}>
              
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`mockup mockup--${p.theme}`}
                aria-label={`Visit ${p.name}`}
              >
                <div className="mockup-chrome">
                  <span className="chrome-dot" />
                  <span className="chrome-dot" />
                  <span className="chrome-dot" />
                  <span className="chrome-url">{p.url.replace('https://www.', '').replace('/', '')}</span>
                </div>
                <div className="mockup-screen">
                  {p.theme === 'dark' ? (
                    <div className="screen-content screen-content--dark">
                      <span className="screen-tag">WHEY · CREATINE · BCAA</span>
                      <span className="screen-word">FRD NUTRITION</span>
                      <span className="screen-line" />
                    </div>
                  ) : (
                    <div className="screen-content screen-content--light">
                      <span className="screen-tag">GROUP HEALTH · LIFE · WELLNESS</span>
                      <span className="screen-word">POLICICUE</span>
                      <span className="screen-line" />
                    </div>
                  )}
                </div>
              </a>

              <div className="project-info">
                <span className="project-category">{p.category}</span>
                <h3 className="project-name">{p.name}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="visit-link">
                  Visit live site
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="work-foot">
          <a href="#projects" className="cta-primary">
            See Our Work
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .work-section {
          background: #ffffff;
          padding: 120px 32px;
        }

        .work-inner {
          max-width: 1120px;
          margin: 0 auto;
        }

        .work-head {
          max-width: 560px;
          margin-bottom: 72px;
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
          color: #b68d40;
          margin-bottom: 18px;
        }

        .eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #c9a227;
        }

        .heading {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(32px, 4vw, 44px);
          letter-spacing: -0.02em;
          color: #0b234a;
          margin: 0 0 16px;
        }

        .heading-accent {
          font-style: italic;
        }

        .sub {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #5b6472;
          margin: 0;
        }

        .projects-list {
          display: flex;
          flex-direction: column;
          gap: 96px;
        }

        .project-row {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 56px;
          align-items: center;
        }

        .project-row.reverse {
          grid-template-columns: 1fr 1.15fr;
        }

        .project-row.reverse .mockup {
          order: 2;
        }

        .project-row.reverse .project-info {
          order: 1;
        }

        .mockup {
          display: block;
          border-radius: 10px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: 0 24px 60px -20px rgba(11, 35, 74, 0.25);
          border: 1px solid rgba(11, 35, 74, 0.08);
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.4s ease;
        }

        .mockup:hover {
          transform: translateY(-6px);
          box-shadow: 0 30px 70px -18px rgba(11, 35, 74, 0.32);
        }

        .mockup-chrome {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          background: #eef1f6;
          border-bottom: 1px solid rgba(11, 35, 74, 0.06);
        }

        .chrome-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(11, 35, 74, 0.18);
        }

        .chrome-url {
          margin-left: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: rgba(11, 35, 74, 0.4);
        }

        .mockup-screen {
          aspect-ratio: 16 / 11;
          position: relative;
          overflow: hidden;
        }

        .screen-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          text-align: center;
        }

        .screen-content--dark {
          background: radial-gradient(ellipse at 30% 20%, #241405 0%, #0d0904 55%),
            linear-gradient(160deg, #0d0904 0%, #1a0f05 100%);
        }

        .screen-content--dark::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 75% 75%, rgba(226, 74, 41, 0.25), transparent 55%);
        }

        .screen-content--light {
          background: linear-gradient(155deg, #f4f6fa 0%, #e7ecf3 100%);
        }

        .screen-tag {
          position: relative;
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          z-index: 1;
        }

        .screen-content--dark .screen-tag {
          color: rgba(255, 255, 255, 0.5);
        }

        .screen-content--light .screen-tag {
          color: rgba(11, 35, 74, 0.45);
        }

        .screen-word {
          position: relative;
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.01em;
          z-index: 1;
        }

        .screen-content--dark .screen-word {
          color: #f4d68a;
        }

        .screen-content--light .screen-word {
          color: #0b234a;
        }

        .screen-line {
          position: relative;
          width: 60px;
          height: 2px;
          z-index: 1;
        }

        .screen-content--dark .screen-line {
          background: linear-gradient(90deg, #e24a29, #f4d68a);
        }

        .screen-content--light .screen-line {
          background: #c9a227;
        }

        .project-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .project-category {
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #b68d40;
          margin-bottom: 14px;
        }

        .project-name {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 30px;
          letter-spacing: -0.01em;
          color: #0b234a;
          margin: 0 0 16px;
        }

        .project-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          line-height: 1.7;
          color: #5b6472;
          margin: 0 0 22px;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 26px;
        }

        .tag {
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          color: #0b234a;
          background: rgba(11, 35, 74, 0.05);
          border: 1px solid rgba(11, 35, 74, 0.1);
          padding: 5px 12px;
          border-radius: 100px;
        }

        .visit-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #0b234a;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1px solid rgba(11, 35, 74, 0.2);
          transition: border-color 0.3s ease, color 0.3s ease, gap 0.3s ease;
        }

        .visit-link:hover {
          color: #c9a227;
          border-color: #c9a227;
          gap: 11px;
        }

        .work-foot {
          display: flex;
          justify-content: center;
          margin-top: 88px;
        }

        .cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #08182f;
          text-decoration: none;
          padding: 14px 28px;
          border-radius: 10px;
          background: linear-gradient(135deg, #e2c068, #c9a227);
          box-shadow: 0 12px 30px -12px rgba(201,162,39,0.45);
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .cta-primary:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 40px -14px rgba(201,162,39,0.5);
        }

        .cta-white {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0b234a;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 10px;
          background: #ffffff;
          border: 1px solid rgba(11,35,74,0.06);
          box-shadow: 0 8px 30px rgba(11,35,74,0.06);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }

        .cta-white:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(11,35,74,0.08);
        }

        @media (max-width: 860px) {
          .project-row,
          .project-row.reverse {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .project-row.reverse .mockup,
          .project-row.reverse .project-info {
            order: unset;
          }
        }

        @media (max-width: 640px) {
          .work-section {
            padding: 80px 20px;
          }
          .projects-list {
            gap: 56px;
          }
          .project-name {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  )
}