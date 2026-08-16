'use client'

import { useState } from 'react'

export default function ServicesPreview() {
  const services = [
    {
      num: '01',
      title: 'Web Development',
      desc: 'Fast, scalable websites and web apps built to convert — not just look good.',
      tags: ['Next.js & React', 'E-commerce', 'Web Apps', 'Performance'],
    },
    {
      num: '02',
      title: 'Design',
      desc: 'Product design, UI/UX, and branding that gives your business a distinct identity.',
      tags: ['Brand Identity', 'UI/UX', 'Product Design', 'Design Systems'],
    },
    {
      num: '03',
      title: 'Social Media',
      desc: 'Strategy, content, and growth systems that turn attention into customers.',
      tags: ['Strategy', 'Content Production', 'Paid Growth', 'Analytics'],
    },
  ]

  const [active, setActive] = useState(null)

  return (
    <section id="services" className="services">
      <div className="services-inner">
        <div className="services-head">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Capabilities
          </div>
          <h2 className="heading">
            What we <span className="heading-accent">do</span>
          </h2>
          <p className="sub">
            Three disciplines, one team — so your brand, product, and growth
            never feel disconnected.
          </p>
        </div>

        <div className="services-list">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={`service-row ${active === i ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="row-num">{s.num}</span>

              <div className="row-main">
                <h3 className="row-title">{s.title}</h3>
                <p className="row-desc">{s.desc}</p>
                <div className="row-tags">
                  {s.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </div>

              <span className="row-arrow" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          ))}
        </div>

        <div className="services-foot">
          <a href="#services" className="cta-primary">
            View all services
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <style jsx>{`
        .services {
          background: #ffffff;
          padding: 120px 32px;
        }

        .services-inner {
          max-width: 1080px;
          margin: 0 auto;
        }

        .services-head {
          max-width: 560px;
          margin-bottom: 64px;
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
          color: #0b234a;
        }

        .sub {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #5b6472;
          margin: 0;
        }

        .services-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(11, 35, 74, 0.1);
        }

        .service-row {
          position: relative;
          display: grid;
          grid-template-columns: 90px 1fr 40px;
          align-items: start;
          gap: 32px;
          padding: 40px 24px;
          border-bottom: 1px solid rgba(11, 35, 74, 0.1);
          cursor: pointer;
          transition: background 0.4s ease, padding 0.4s ease;
        }

        .service-row.is-active {
          background: linear-gradient(90deg, rgba(201, 162, 39, 0.05), transparent 60%);
          padding-left: 32px;
        }

        .row-num {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          color: rgba(11, 35, 74, 0.25);
          transition: color 0.4s ease;
          padding-top: 4px;
        }

        .service-row.is-active .row-num {
          color: #c9a227;
        }

        .row-title {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 26px;
          letter-spacing: -0.01em;
          color: #0b234a;
          margin: 0 0 10px;
          transition: transform 0.4s ease;
        }

        .service-row.is-active .row-title {
          transform: translateX(4px);
        }

        .row-desc {
          font-family: 'Inter', sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: #5b6472;
          max-width: 480px;
          margin: 0 0 20px;
        }

        .row-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.45s ease, opacity 0.35s ease;
        }

        .service-row.is-active .row-tags {
          max-height: 60px;
          opacity: 1;
        }

        .tag {
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #0b234a;
          background: rgba(11, 35, 74, 0.05);
          border: 1px solid rgba(11, 35, 74, 0.1);
          padding: 5px 12px;
          border-radius: 100px;
        }

        .row-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(11, 35, 74, 0.15);
          color: #0b234a;
          transform: rotate(0deg);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .service-row.is-active .row-arrow {
          transform: rotate(45deg);
          background: #c9a227;
          border-color: #c9a227;
          color: #0b234a;
        }

        .services-foot {
          display: flex;
          justify-content: center;
          margin-top: 56px;
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

        @media (max-width: 720px) {
          .services {
            padding: 80px 20px;
          }
          .service-row {
            grid-template-columns: 50px 1fr;
          }
          .row-arrow {
            display: none;
          }
          .service-row.is-active {
            padding-left: 24px;
          }
          .row-tags {
            max-height: 100px;
          }
          .service-row .row-tags {
            max-height: 100px;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}