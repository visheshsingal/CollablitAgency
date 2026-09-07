import Head from 'next/head'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const services = [
  {
    num: '01',
    title: 'Brand Strategy',
    short: 'Positioning that makes your business feel clearer, sharper, and worth paying for.',
    bullets: ['Messaging', 'Positioning', 'Offer design', 'Audience clarity'],
    accent: 'Strategy-first clarity',
  },
  {
    num: '02',
    title: 'Web Development',
    short: 'High-converting websites and digital experiences built to scale with your business.',
    bullets: ['Next.js websites', 'Landing pages', 'Web apps', 'Conversion flows'],
    accent: 'Built to perform',
  },
  {
    num: '03',
    title: 'Design Systems',
    short: 'Premium visual identity and UI systems that make brands feel polished and memorable.',
    bullets: ['Brand identity', 'UI/UX', 'Creative direction', 'Design systems'],
    accent: 'Premium design language',
  },
  {
    num: '04',
    title: 'Social Media Growth',
    short: 'Content engine and creative execution that turn attention into qualified leads and trust.',
    bullets: ['Content strategy', 'Creative production', 'Growth systems', 'Campaign reporting'],
    accent: 'Momentum that compounds',
  },
]

const process = [
  { step: '01', title: 'Discover', text: 'We understand your offer, your audience, and what growth really needs from your brand.' },
  { step: '02', title: 'Design', text: 'We shape the story, digital experience, and execution framework around your real goals.' },
  { step: '03', title: 'Deliver', text: 'We launch clear systems, content, and digital assets that move the brand forward.' },
]

export default function ServicesPage() {
  return (
    <>
      <Head>
        <title>Services | Collablit Solutions</title>
        <meta
          name="description"
          content="Explore Collablit Solutions services including brand strategy, web development, design systems, and social media growth."
        />
      </Head>

      <Navbar />

      <main className="page-shell">
        <section className="hero">
          <div className="eyebrow-wrap">
            <span className="eyebrow-dot" />
            <span>Services</span>
          </div>

          <h1>
            Premium digital services built for <span>brands that want to grow with clarity.</span>
          </h1>

          <p className="lede">
            We help founders and businesses turn fragmented digital presence into one sharp, credible, conversion-driven system.
          </p>
        </section>

        <section className="services-grid">
          {services.map((service) => (
            <article key={service.num} className="service-card">
              <div className="card-top">
                <span className="number">{service.num}</span>
                <span className="pill">{service.accent}</span>
              </div>

              <h2>{service.title}</h2>
              <p>{service.short}</p>

              <ul>
                {service.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="process-block">
          <div className="process-header">
            <div className="eyebrow-wrap">
              <span className="eyebrow-dot" />
              <span>How we work</span>
            </div>
            <h2>Simple process. Sharp outcomes.</h2>
          </div>

          <div className="process-grid">
            {process.map((step) => (
              <div key={step.step} className="process-card">
                <span className="step">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <p className="mini-label">Ready to build</p>
          <h3>Let&apos;s turn your next move into a visible advantage.</h3>
          <a href="/book-meeting" className="primary-btn">
            Book a Meeting
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .page-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 24px 72px;
        }

        .hero {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 18px;
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
          padding: 10px 14px;
          border-radius: 999px;
          margin-bottom: 22px;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #c9a227;
        }

        h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(3rem, 5vw, 5rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: #0b234a;
          margin: 0 auto 18px;
          max-width: 840px;
        }

        h1 span {
          color: #1d4694;
        }

        .lede {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.08rem;
          line-height: 1.8;
          color: #4a5977;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-top: 14px;
        }

        .service-card {
          background: linear-gradient(180deg, #ffffff 0%, #f7f9fd 100%);
          border: 1px solid rgba(11, 35, 74, 0.08);
          border-radius: 26px;
          padding: 28px 24px 24px;
          box-shadow: 0 25px 50px -35px rgba(11, 35, 74, 0.35);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 18px;
        }

        .number {
          font-family: 'Fraunces', serif;
          font-size: 28px;
          color: rgba(11, 35, 74, 0.3);
          font-style: italic;
        }

        .pill {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0b234a;
          background: rgba(201, 162, 39, 0.12);
          border: 1px solid rgba(201, 162, 39, 0.2);
          border-radius: 999px;
          padding: 7px 10px;
        }

        .service-card h2 {
          font-family: 'Fraunces', serif;
          font-size: clamp(1.7rem, 2vw, 2.3rem);
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #0b234a;
          margin: 0 0 12px;
        }

        .service-card p {
          font-size: 1rem;
          line-height: 1.8;
          color: #4d5a72;
          margin: 0 0 20px;
        }

        .service-card ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .service-card li {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.05em;
          color: #0b234a;
          background: rgba(11, 35, 74, 0.05);
          border: 1px solid rgba(11, 35, 74, 0.08);
          border-radius: 999px;
          padding: 7px 11px;
          text-transform: uppercase;
        }

        .process-block {
          margin-top: 56px;
        }

        .process-header {
          text-align: center;
          margin-bottom: 22px;
        }

        .process-header h2 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          letter-spacing: -0.03em;
          color: #0b234a;
          margin: 0;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }

        .process-card {
          background: linear-gradient(180deg, #0b234a 0%, #112e5d 100%);
          color: white;
          border-radius: 24px;
          padding: 26px 22px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .step {
          display: inline-flex;
          margin-bottom: 20px;
          font-family: 'Fraunces', serif;
          font-size: 28px;
          font-style: italic;
          color: #e2c068;
        }

        .process-card h3 {
          margin: 0 0 10px;
          font-size: 1.35rem;
        }

        .process-card p {
          margin: 0;
          line-height: 1.8;
          color: rgba(255,255,255,0.72);
        }

        .cta-panel {
          margin-top: 56px;
          background: linear-gradient(135deg, #0b234a, #132d5d 58%, #1d4694);
          border-radius: 30px;
          padding: 42px 26px;
          text-align: center;
          color: white;
        }

        .mini-label {
          margin: 0 0 12px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #e2c068;
        }

        .cta-panel h3 {
          margin: 0 auto 24px;
          max-width: 620px;
          font-family: 'Fraunces', serif;
          font-size: clamp(2rem, 3vw, 3rem);
          line-height: 1.12;
          letter-spacing: -0.03em;
        }

        .primary-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          background: linear-gradient(135deg, #e2c068, #c9a227);
          color: #08182f;
          font-weight: 700;
          padding: 16px 28px;
          border-radius: 12px;
          box-shadow: 0 18px 30px -16px rgba(201,162,39,0.7);
        }

        @media (max-width: 900px) {
          .services-grid,
          .process-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
