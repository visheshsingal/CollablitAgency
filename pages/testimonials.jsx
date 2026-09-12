import Head from 'next/head'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

const testimonials = [
  {
    name: 'Antonis Spyropoulos',
    role: 'Founder',
    company: 'CodeSoftLab',
    quote:
      'Collablit gave us a clearer story, a sharper funnel, and a digital presence that finally matched the quality of our work. The process felt strategic from day one.',
    image:
      'https://media.licdn.com/dms/image/v2/D4D03AQGVkp6KFEASEw/profile-displayphoto-crop_800_800/B4DZvWr5nfKoAI-/0/1768833391631?e=1790208000&v=beta&t=n8X6gjmgkx3iMqIbaj7C8lABMj62MIdmF8RpJZx_3ds',
  },
  {
    name: 'Vikas Mathur',
    role: 'Co founder & Director',
    company: 'Policicue',
    quote:
      'The team translated complex product value into messaging that clients actually understood. We saw better lead quality within weeks of launch.',
    image:
      'https://media.licdn.com/dms/image/v2/D5603AQHL1rgMmsKxaA/profile-displayphoto-scale_200_200/B56ZkJZHmkHUAY-/0/1756799205299?e=2147483647&v=beta&t=dIJIiH7P42USBMrfmZejyivranV3_PTMjoJRo5KUvek',
  },
  { 

    name: 'Tilak Raj Jain',
    role: 'Director',
    company: 'Vishesh Academy of Commerce',
    quote:
      'Their design and execution helped us look premium without losing clarity. Every touchpoint now feels intentional and conversion-focused.',
    image:
      'https://visheshacademy.com/assets/slider/tilak2.png',
  },
]

export default function TestimonialsPage() {
  return (
    <>
      <Head>
        <title>Testimonials | Collablit Solutions</title>
        <meta
          name="description"
          content="See how clients describe working with Collablit Solutions for brand strategy, design, and growth-focused digital work."
        />
      </Head>

      <Navbar />

      <main className="page-shell">
        <section className="hero-block">
          <p className="eyebrow">Client feedback</p>
          <h1>What clients say after the work starts.</h1>
          <p className="lede">
            Real experiences from founders and teams who needed sharper positioning,
            stronger visuals, and digital systems that actually converted.
          </p>
        </section>

        <section className="testimonial-grid">
          {testimonials.map((item, index) => (
            <article key={item.name} className="testimonial-card">
              <div className="card-top">
                <div className={`avatar-wrap ${index === 2 ? 'avatar-wrap--top-crop' : ''}`}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="rating-block">
                  <span className="stars" aria-label="5 star review">★★★★★</span>
                  <span className="rating-text">Verified client</span>
                </div>
              </div>

              <div className="card-body">
                <p className="quote">“{item.quote}”</p>
                <div className="person">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                  <small>{item.company}</small>
                </div>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .page-shell {
          max-width: 1200px;
          margin: 0 auto;
          padding: 52px 24px 96px;
        }

        .hero-block {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 36px;
        }

        .eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #1d4694;
          background: rgba(29, 70, 148, 0.08);
          padding: 10px 14px;
          border-radius: 999px;
          margin: 0 0 18px;
        }

        h1 {
          font-family: 'Fraunces', serif;
          font-size: clamp(2.5rem, 5vw, 4.4rem);
          line-height: 1.05;
          margin: 0 0 18px;
          color: #0b234a;
        }

        .lede {
          margin: 0 auto;
          max-width: 640px;
          font-size: 1.08rem;
          line-height: 1.8;
          color: #4b5875;
        }

        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
        }

        .testimonial-card {
          background: linear-gradient(180deg, #ffffff 0%, #f7f9fd 100%);
          border: 1px solid rgba(19, 40, 73, 0.08);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 25px 60px -35px rgba(11, 35, 74, 0.35);
        }

        .card-top {
          padding: 18px 18px 0;
        }

        .avatar-wrap {
          height: 250px;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(19, 40, 73, 0.05);
        }

        .avatar-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .avatar-wrap--top-crop img {
          object-position: center 18%;
        }

        .rating-block {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 4px 0;
        }

        .stars {
          letter-spacing: 0.15em;
          color: #c9a227;
          font-size: 0.78rem;
        }

        .rating-text {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1d4694;
        }

        .card-body {
          padding: 20px 20px 26px;
        }

        .quote {
          margin: 0 0 22px;
          color: #24314d;
          line-height: 1.8;
          font-size: 0.98rem;
        }

        .person {
          display: flex;
          flex-direction: column;
          gap: 5px;
          color: #465779;
          font-size: 0.92rem;
        }

        .person strong {
          color: #0b234a;
          font-size: 1.04rem;
        }

        .person small {
          color: #1d4694;
          font-weight: 600;
        }

        @media (max-width: 980px) {
          .testimonial-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
