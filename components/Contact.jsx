'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    project: '',
    designType: '',
    customDesign: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | submitting | sent

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // reset dependent fields when the main service changes
      ...(name === 'project' ? { designType: '', customDesign: '' } : {}),
      ...(name === 'designType' && value !== 'custom' ? { customDesign: '' } : {}),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    // Wire this up to your form endpoint / API route
    setTimeout(() => setStatus('sent'), 900)
  }

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <div className="contact-panel">
          <span className="corner corner--tl" aria-hidden="true" />
          <span className="corner corner--br" aria-hidden="true" />

          <div className="panel-content">
            <div className="eyebrow">
              <span className="eyebrow-dot" />
              Get in touch
            </div>
            <h2 className="panel-heading">
              Let&apos;s build <span className="accent">something</span> real.
            </h2>
            <p className="panel-sub">
              Tell us about your project and we&apos;ll get back to you within
              24 hours — no automated replies, a real person reads every message.
            </p>

            <div className="contact-details">
              <a href="mailto:support@collablit.com" className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">support@collablit.com</span>
              </a>
              <a href="tel:+919024939664" className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">+91 90249 39664</span>
              </a>
              <div className="detail-item">
                <span className="detail-label">Response Time</span>
                <span className="detail-value">Within 24 hours</span>
              </div>
            </div>

            <div className="social-row">
              <a href="#" aria-label="Instagram" className="social-link">IG</a>
              <a href="#" aria-label="LinkedIn" className="social-link">IN</a>
              <a href="#" aria-label="Twitter" className="social-link">X</a>
            </div>
          </div>
        </div>

        <div className="form-wrap">
          {status === 'sent' ? (
            <div className="success-state">
              <div className="success-icon">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11.5L9 16.5L18 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>Message sent</h3>
              <p>Thanks for reaching out — we&apos;ll be in touch within 24 hours.</p>
              <button className="reset-btn" onClick={() => {
                setStatus('idle')
                setForm({ name: '', email: '', project: '', designType: '', customDesign: '', message: '' })
              }}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Jordan Smith"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jordan@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label htmlFor="project">Service you need</label>
                  <select
                    id="project"
                    name="project"
                    value={form.project}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="web">Web Development</option>
                    <option value="design">Design</option>
                    <option value="social">Social Media Management</option>
                    <option value="full">Full-Service Partnership</option>
                  </select>
                </div>

                {form.project === 'design' && (
                  <div className="field">
                    <label htmlFor="designType">Type of design</label>
                    <select
                      id="designType"
                      name="designType"
                      value={form.designType}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Select a type</option>
                      <option value="graphics">Graphics Design</option>
                      <option value="web">Web Design</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                )}
              </div>

              {form.project === 'design' && form.designType === 'custom' && (
                <div className="field">
                  <label htmlFor="customDesign">Tell us what kind of design</label>
                  <input
                    id="customDesign"
                    name="customDesign"
                    type="text"
                    placeholder="e.g. Packaging design, pitch deck, motion graphics..."
                    value={form.customDesign}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="field">
                <label htmlFor="message">Tell us about your project</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you looking to build, and what timeline are you working with?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
                {status !== 'submitting' && (
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <style jsx>{`
        .contact-section {
          background: #ffffff;
          padding: 120px 32px;
        }

        .contact-inner {
          max-width: 1120px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 30px 80px -30px rgba(11, 35, 74, 0.22);
        }

        .contact-panel {
          position: relative;
          background: #0a1f42;
          padding: 64px 48px;
          display: flex;
          align-items: center;
        }

        .corner {
          position: absolute;
          width: 22px;
          height: 22px;
          border: 1.5px solid #c9a227;
        }

        .corner--tl {
          top: 24px;
          left: 24px;
          border-right: none;
          border-bottom: none;
        }

        .corner--br {
          bottom: 24px;
          right: 24px;
          border-left: none;
          border-top: none;
        }

        .panel-content {
          width: 100%;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e2c068;
          margin-bottom: 22px;
        }

        .eyebrow-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #e2c068;
        }

        .panel-heading {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: clamp(26px, 2.6vw, 34px);
          line-height: 1.2;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin: 0 0 16px;
        }

        .accent {
          font-style: italic;
          color: #e2c068;
        }

        .panel-sub {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(255, 255, 255, 0.55);
          margin: 0 0 40px;
        }

        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          margin-bottom: 32px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-decoration: none;
        }

        .detail-label {
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.4);
        }

        .detail-value {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          color: #ffffff;
          transition: color 0.25s ease;
        }

        a.detail-item:hover .detail-value {
          color: #e2c068;
        }

        .social-row {
          display: flex;
          gap: 10px;
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.18);
          font-family: 'Inter', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.65);
          text-decoration: none;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
        }

        .social-link:hover {
          background: #c9a227;
          border-color: #c9a227;
          color: #0a1f42;
        }

        .form-wrap {
          background: #fbfbfc;
          padding: 64px 56px;
          display: flex;
          align-items: center;
        }

        .contact-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .field-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .field label {
          font-family: 'Inter', sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #0b234a;
        }

        .field input,
        .field select,
        .field textarea {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          color: #0b234a;
          background: #ffffff;
          border: 1px solid rgba(11, 35, 74, 0.14);
          border-radius: 8px;
          padding: 13px 15px;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          font-family: inherit;
        }

        .field input::placeholder,
        .field textarea::placeholder {
          color: rgba(11, 35, 74, 0.32);
        }

        .field input:focus,
        .field select:focus,
        .field textarea:focus {
          border-color: #c9a227;
          box-shadow: 0 0 0 3px rgba(201, 162, 39, 0.15);
        }

        .field textarea {
          resize: vertical;
          min-height: 110px;
        }

        .field select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%230B234A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 15px center;
          cursor: pointer;
        }

        .submit-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          padding: 15px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: #0b234a;
          color: #ffffff;
          margin-top: 6px;
          transition: background 0.3s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }

        .submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #e2c068, #c9a227);
          color: #0a1f42;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px -10px rgba(201, 162, 39, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .success-state {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
        }

        .success-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(201, 162, 39, 0.12);
          color: #b68d40;
          margin-bottom: 14px;
        }

        .success-state h3 {
          font-family: 'Fraunces', serif;
          font-weight: 600;
          font-size: 22px;
          color: #0b234a;
          margin: 0;
        }

        .success-state p {
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          color: #5b6472;
          margin: 0 0 18px;
        }

        .reset-btn {
          font-family: 'Inter', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          color: #0b234a;
          background: none;
          border: 1px solid rgba(11, 35, 74, 0.18);
          border-radius: 100px;
          padding: 10px 20px;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease;
        }

        .reset-btn:hover {
          background: rgba(11, 35, 74, 0.05);
        }

        @media (max-width: 860px) {
          .contact-inner {
            grid-template-columns: 1fr;
            border-radius: 12px;
          }
          .contact-panel,
          .form-wrap {
            padding: 44px 28px;
          }
          .field-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .contact-section {
            padding: 80px 20px;
          }
        }
      `}</style>
    </section>
  )
}