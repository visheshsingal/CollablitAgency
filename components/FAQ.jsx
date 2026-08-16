'use client'

import { useState } from 'react'

export default function FAQ() {
  const faqs = [
    {
      q: 'What services do you offer?',
      a: 'Development, design, and social media management — full-funnel, from brand identity to the website that carries it and the content that grows it.',
    },
    {
      q: 'How do you price projects?',
      a: 'Every project gets scoped individually based on complexity and timeline. You get a clear, custom proposal before any work begins — no vague retainers.',
    },
    {
      q: 'How long does a typical project take?',
      a: 'A brand or website build usually runs 3–6 weeks depending on scope. Social media engagements run as ongoing monthly partnerships.',
    },
    {
      q: 'Do you work with early-stage brands or only established ones?',
      a: "Both. We've partnered with brands from first launch to scaling operations — what matters is that you're serious about the outcome.",
    },
    {
      q: 'How can we get started?',
      a: 'Reach out via the contact form below or email us directly to schedule a free scoping call — we usually respond within 24 hours.',
    },
  ]

  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (i) => setOpenIndex(openIndex === i ? -1 : i)

  return (
    <section id="faq" className="faq-section">
      <div className="faq-bg" aria-hidden="true">
        <div className="faq-glow" />
      </div>

      <div className="faq-inner">
        <div className="faq-head">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Good to know
          </div>
          <h2 className="heading">
            Questions, <span className="accent">answered</span>
          </h2>
          <p className="sub">
            Everything you'd want to know before reaching out. Still curious? Just ask.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={f.q} className={`faq-item ${openIndex === i ? 'is-open' : ''}`}>
              <button
                className="faq-trigger"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-question">{f.q}</span>
                <span className="faq-icon" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2V12M2 7H12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>

              <div className="faq-panel">
                <p className="faq-answer">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .faq-section {
          position: relative;
          background: #0a1f42;
          padding: 120px 32px;
          overflow: hidden;
        }

        .faq-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .faq-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          width: 640px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(29, 70, 148, 0.4) 0%, transparent 70%);
          transform: translateX(-50%);
        }

        .faq-inner {
          position: relative;
          z-index: 1;
          max-width: 760px;
          margin: 0 auto;
        }

        .faq-head {
          text-align: center;
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
          color: #e2c068;
          background: rgba(201, 162, 39, 0.1);
          border: 1px solid rgba(201, 162, 39, 0.25);
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 24px;
        }

        .eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e2c068;
        }

        .heading {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(30px, 4vw, 42px);
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0 0 14px;
        }

        .accent {
          font-style: italic;
          color: #e2c068;
        }

        .sub {
          font-family: 'Inter', sans-serif;
          font-size: 15.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .faq-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .faq-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 26px 4px;
          text-align: left;
          transition: padding 0.3s ease;
        }

        .faq-item.is-open .faq-trigger {
          padding-bottom: 14px;
        }

        .faq-num {
          font-family: 'Fraunces', serif;
          font-style: italic;
          font-weight: 500;
          font-size: 15px;
          color: rgba(226, 192, 104, 0.55);
          flex-shrink: 0;
          width: 24px;
          transition: color 0.3s ease;
        }

        .faq-item.is-open .faq-num {
          color: #e2c068;
        }

        .faq-question {
          flex: 1;
          font-family: 'Inter', sans-serif;
          font-size: 16.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.3s ease;
        }

        .faq-item.is-open .faq-question {
          color: #ffffff;
        }

        .faq-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: rgba(255, 255, 255, 0.7);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
        }

        .faq-item.is-open .faq-icon {
          transform: rotate(135deg);
          background: #c9a227;
          border-color: #c9a227;
          color: #0a1f42;
        }

        .faq-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.is-open .faq-panel {
          grid-template-rows: 1fr;
        }

        .faq-panel > :global(*) {
          overflow: hidden;
        }

        .faq-answer {
          overflow: hidden;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.55);
          margin: 0;
          padding: 0 4px 26px 44px;
          max-width: 560px;
        }

        @media (max-width: 640px) {
          .faq-section {
            padding: 80px 20px;
          }
          .faq-question {
            font-size: 15px;
          }
          .faq-answer {
            padding-left: 4px;
          }
        }
      `}</style>
    </section>
  )
}