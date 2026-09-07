import Head from 'next/head'
import { useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const developmentProjects = [
  {
    name: 'Policicue',
    category: 'Corporate · Insurance',
    description:
      'A clarity-first digital presence for a group insurance brand, focused on trust, plan comparisons, and high-intent lead generation for HR and employer decision-makers.',
    tags: ['Corporate Website', 'Lead Generation', 'Trust-building UX'],
    url: 'https://www.policicue.com/',
    accent: 'Corporate trust',
  },
  {
    name: 'FRD Nutrition',
    category: 'D2C · E-commerce',
    description:
      'A high-energy storefront designed to convert performance-focused buyers with strong product positioning, premium visuals, and clear purchasing flow.',
    tags: ['E-commerce', 'Conversion UX', 'Premium Brand Design'],
    url: 'https://www.frdnutritionpremium.com/',
    accent: 'Performance brand',
  },
  {
    name: 'Vishesh Academy of Commerce',
    category: 'Education · Brand Platform',
    description:
      'A polished academy website and positioning system built to increase trust, explain their programs clearly, and make the learning offer feel premium and credible.',
    tags: ['Education Brand', 'Landing Pages', 'Conversion-focused UX'],
    url: 'https://visheshacademy.com',
    accent: 'Academic authority',
  },
]

const designProjects = []

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('development')
  const projects = activeTab === 'development' ? developmentProjects : designProjects

  return (
    <>
      <Head>
        <title>Projects | Collablit Solutions</title>
        <meta
          name="description"
          content="View Collablit Solutions projects spanning web development, brand-led product experiences, and premium digital growth work."
        />
      </Head>

      <Navbar />

      <main className="page-shell">
        <section className="hero">
          <div className="eyebrow-wrap">
            <span className="eyebrow-dot" />
            <span>Selected work</span>
          </div>
          <h1>Projects we&apos;re proud of</h1>
          <p className="lede">
            Strategy, design, and execution shaped around real business goals — from institutional trust to premium consumer brands.
          </p>
        </section>

        <section className="tabs-wrap">
          <div className="segmented-tabs" aria-label="Project categories">
            <div
              className={`tab-indicator ${activeTab === 'development' ? 'left' : 'right'}`}
              aria-hidden="true"
            />

            <button
              type="button"
              className={`tab-button ${activeTab === 'development' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('development')}
            >
              Development
            </button>

            <button
              type="button"
              className={`tab-button ${activeTab === 'design' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              Design
            </button>
          </div>
        </section>

        <section className="project-list">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <article key={project.name} className={`project-card ${index % 2 === 1 ? 'reverse' : ''}`}>
                <div className="project-visual">
                  <div className="window-bar">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="window-body">
                    <div className="body-header">{project.name}</div>
                    <div className="body-copy">
                      <span className="copy-pill">{project.accent}</span>
                      <span className="copy-line long" />
                      <span className="copy-line" />
                      <span className="copy-line" />
                    </div>
                  </div>
                </div>

                <div className="project-info">
                  <span className="project-category">{project.category}</span>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>

                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>

                  <a href={project.url} target="_blank" rel="noreferrer" className="visit-link">
                    Visit live site
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M4 10L10 4M10 4H5M10 4V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">
              <h2>Design work coming soon</h2>
              <p>We&apos;re building out the design showcase section for the next wave of projects.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .page-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 18px 24px 72px;
        }

        .hero {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 14px;
        }

        .eyebrow-wrap {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1d4694;
          background: rgba(29, 70, 148, 0.08);
          border-radius: 999px;
          padding: 10px 14px;
          margin-bottom: 18px;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a227;
        }

        h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.8rem, 5vw, 4.6rem);
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin: 0 0 18px;
          color: #0b234a;
        }

        .lede {
          margin: 0 auto;
          max-width: 700px;
          font-size: 1.08rem;
          line-height: 1.8;
          color: #4a5977;
        }

        .tabs-wrap {
          display: flex;
          justify-content: center;
          margin: 0 auto 22px;
        }

        .segmented-tabs {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: min(100%, 500px);
          padding: 8px;
          border-radius: 999px;
          background: #edf1f6;
          border: 1px solid rgba(11, 35, 74, 0.08);
          overflow: hidden;
        }

        .tab-indicator {
          position: absolute;
          top: 8px;
          left: 8px;
          width: calc(50% - 8px);
          height: calc(100% - 16px);
          border-radius: 999px;
          background: linear-gradient(135deg, #0b234a, #1d4694);
          box-shadow: 0 12px 22px -12px rgba(11, 35, 74, 0.7);
          transition: transform 0.32s ease;
        }

        .tab-indicator.left {
          transform: translateX(0%);
        }

        .tab-indicator.right {
          transform: translateX(100%);
        }

        .tab-button {
          position: relative;
          z-index: 1;
          border: 0;
          background: transparent;
          color: #4e5d7a;
          padding: 14px 18px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-size: 12px;
          cursor: pointer;
          transition: color 0.25s ease;
        }

        .tab-button.is-active {
          color: #ffffff;
        }

        .project-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .project-card {
          display: grid;
          grid-template-columns: 1.12fr 1fr;
          gap: 24px;
          align-items: center;
          padding: 18px;
          background: linear-gradient(180deg, #ffffff 0%, #f8f9fd 100%);
          border: 1px solid rgba(11, 35, 74, 0.08);
          border-radius: 28px;
          box-shadow: 0 28px 60px -36px rgba(11, 35, 74, 0.3);
        }

        .project-card.reverse {
          grid-template-columns: 1fr 1.12fr;
        }

        .project-card.reverse .project-visual {
          order: 2;
        }

        .project-card.reverse .project-info {
          order: 1;
        }

        .project-visual {
          background: linear-gradient(135deg, #0d1f40 0%, #16366d 50%, #0b234a 100%);
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.1);
        }

        .window-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 14px;
          background: rgba(255,255,255,0.04);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .window-bar span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }

        .window-body {
          padding: 22px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        .body-header {
          font-family: 'Fraunces', serif;
          font-size: 2rem;
          color: #f6d98d;
          letter-spacing: -0.03em;
        }

        .body-copy {
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 280px;
        }

        .copy-pill {
          display: inline-flex;
          align-self: flex-start;
          padding: 7px 10px;
          border-radius: 999px;
          background: rgba(246, 217, 141, 0.12);
          border: 1px solid rgba(246, 217, 141, 0.24);
          color: #f6d98d;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .copy-line {
          display: block;
          height: 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.14);
        }

        .copy-line.long {
          width: 100%;
        }

        .project-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .project-category {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #b68d40;
          margin-bottom: 13px;
        }

        .project-info h2 {
          margin: 0 0 12px;
          font-family: 'Fraunces', serif;
          font-size: clamp(2rem, 3vw, 2.8rem);
          letter-spacing: -0.03em;
          color: #0b234a;
        }

        .project-info p {
          margin: 0 0 20px;
          color: #4d5a72;
          line-height: 1.8;
          font-size: 1rem;
        }

        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 22px;
        }

        .tag {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(11,35,74,0.05);
          border: 1px solid rgba(11,35,74,0.08);
          color: #0b234a;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .visit-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: #0b234a;
          font-weight: 700;
        }

        .empty-state {
          text-align: center;
          padding: 46px 22px;
          background: #f7f9fd;
          border: 1px solid rgba(11,35,74,0.08);
          border-radius: 20px;
        }

        .empty-state h2 {
          font-family: 'Fraunces', serif;
          font-size: 2.2rem;
          color: #0b234a;
          margin: 0 0 10px;
        }

        .empty-state p {
          margin: 0;
          color: #56657c;
        }

        @media (max-width: 900px) {
          .project-card,
          .project-card.reverse {
            grid-template-columns: 1fr;
          }

          .project-card.reverse .project-visual,
          .project-card.reverse .project-info {
            order: unset;
          }
        }
      `}</style>
    </>
  )
}
