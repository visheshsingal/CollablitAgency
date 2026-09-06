'use client'

import { useState } from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'

export default function BookMeetingPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    agenda: '',
    goals: '',
    timeline: '',
    budget: '',
    meetingDate: '',
    meetingTime: '',
    duration: '30 mins',
    message: '',
  })

  const timeSlots = [
    '9:00 AM – 10:00 AM',
    '10:30 AM – 11:30 AM',
    '12:00 PM – 1:00 PM',
    '2:00 PM – 3:00 PM',
    '4:00 PM – 5:00 PM',
    '5:30 PM – 6:30 PM',
  ]
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [meetDetails, setMeetDetails] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'meeting', ...form }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Your meeting request could not be sent.')
      }

      setStatus('sent')
      setMeetDetails({
        link: data.meetLink,
        date: data.meetingDate,
        time: data.meetingTime,
        duration: data.duration,
      })
      setForm({
        name: '',
        email: '',
        company: '',
        agenda: '',
        goals: '',
        timeline: '',
        budget: '',
        meetingDate: '',
        meetingTime: '',
        duration: '30 mins',
        message: '',
      })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  return (
    <>
      <Head>
        <title>Book a Meeting | Collablit Solutions</title>
        <meta
          name="description"
          content="Book a consultation and share your agenda, goals, timeline, and requirements with Collablit Solutions."
        />
      </Head>

      <Navbar />

      <main className="page-shell">
        <section className="intro">
          <p className="eyebrow">Book a strategy call</p>
          <h1>Tell us where you are and where you want to go.</h1>
          <p className="lede">
            Share your business context, objectives, and timeline. We&apos;ll use this
            to understand the fit and prepare a more valuable conversation.
          </p>
        </section>

        <section className="meeting-layout">
          <div className="info-card">
            <h2>What we want to learn</h2>
            <ul>
              <li>What is your business or brand challenge right now?</li>
              <li>What are your main goals and outcomes?</li>
              <li>What timeline and budget are you working with?</li>
              <li>What do you want the final result to feel like?</li>
            </ul>
            <div className="callout">
              <strong>Best for:</strong>
              <span>Founders, marketing teams, and brands looking for clarity and momentum.</span>
            </div>
          </div>

          <div className="form-wrap">
            {status === 'sent' && meetDetails ? (
              <div className="success-box">
                <div className="success-icon">✓</div>
                <h3>Meeting request sent</h3>
                <p>
                  We&apos;ve booked your session and shared the meeting link with both you and our team.
                </p>
                <div className="meeting-summary">
                  <p><strong>Date:</strong> {meetDetails.date}</p>
                  <p><strong>Time:</strong> {meetDetails.time}</p>
                  <p><strong>Duration:</strong> {meetDetails.duration}</p>
                  <a href={meetDetails.link} target="_blank" rel="noreferrer" className="meet-link">
                    Join Google Meet
                  </a>
                </div>
                <button type="button" className="reset-btn" onClick={() => {
                  setStatus('idle')
                  setMeetDetails(null)
                }}>
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="meeting-form">
                <div className="field-row">
                  <div className="field">
                    <label htmlFor="name">Your name</label>
                    <input id="name" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="company">Company or brand</label>
                  <input id="company" name="company" value={form.company} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="agenda">What is the agenda for this meeting?</label>
                  <textarea id="agenda" name="agenda" rows={3} value={form.agenda} onChange={handleChange} required />
                </div>

                <div className="field">
                  <label htmlFor="goals">What are you trying to achieve?</label>
                  <textarea id="goals" name="goals" rows={3} value={form.goals} onChange={handleChange} required />
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="meetingDate">Preferred date</label>
                    <input id="meetingDate" name="meetingDate" type="date" value={form.meetingDate} onChange={handleChange} required />
                  </div>
                  <div className="field">
                    <label htmlFor="meetingTime">Preferred time slot</label>
                    <select id="meetingTime" name="meetingTime" value={form.meetingTime} onChange={handleChange} required>
                      <option value="" disabled>Select a time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field-row">
                  <div className="field">
                    <label htmlFor="timeline">Timeline</label>
                    <input id="timeline" name="timeline" placeholder="e.g. 4-6 weeks" value={form.timeline} onChange={handleChange} required />
                  </div>
                  <div className="field">
                    <label htmlFor="budget">Budget range</label>
                    <input id="budget" name="budget" placeholder="e.g. INR 50k - 1L" value={form.budget} onChange={handleChange} required />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="duration">Meeting duration</label>
                  <select id="duration" name="duration" value={form.duration} onChange={handleChange}>
                    <option value="30 mins">30 mins</option>
                    <option value="45 mins">45 mins</option>
                    <option value="60 mins">60 mins</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="message">Anything else we should know?</label>
                  <textarea id="message" name="message" rows={4} value={form.message} onChange={handleChange} />
                </div>

                {error && <p className="error-text">{error}</p>}

                <button type="submit" className="submit-btn" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending...' : 'Book my meeting'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .page-shell {
          max-width: 1180px;
          margin: 0 auto;
          padding: 80px 24px 120px;
        }

        .intro {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 42px;
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
          line-height: 1.08;
          color: #0b234a;
          margin: 0 0 16px;
        }

        .lede {
          margin: 0 auto;
          max-width: 620px;
          font-size: 1.08rem;
          line-height: 1.8;
          color: #4b5875;
        }

        .meeting-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 32px;
          align-items: start;
        }

        .info-card, .form-wrap {
          background: #fff;
          border: 1px solid rgba(19, 40, 73, 0.08);
          border-radius: 24px;
          box-shadow: 0 24px 60px -38px rgba(11, 35, 74, 0.28);
        }

        .info-card {
          padding: 28px 24px;
        }

        .info-card h2 {
          margin: 0 0 18px;
          color: #0b234a;
          font-size: 1.6rem;
        }

        .info-card ul {
          margin: 0 0 22px;
          padding-left: 18px;
          color: #465779;
          line-height: 1.9;
        }

        .callout {
          background: rgba(201, 162, 39, 0.12);
          border: 1px solid rgba(201, 162, 39, 0.18);
          border-radius: 16px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          color: #0b234a;
        }

        .form-wrap {
          padding: 24px;
        }

        .meeting-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .field-row {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        label {
          font-weight: 600;
          color: #24314d;
        }

        input, textarea, select {
          width: 100%;
          border: 1px solid rgba(19, 40, 73, 0.12);
          border-radius: 12px;
          padding: 12px 14px;
          font: inherit;
          color: #0b234a;
          background: #fbfcff;
          resize: vertical;
        }

        input:focus, textarea:focus, select:focus {
          border-color: rgba(29, 70, 148, 0.45);
          box-shadow: 0 0 0 4px rgba(29, 70, 148, 0.08);
          outline: none;
        }

        .submit-btn, .reset-btn {
          border: none;
          border-radius: 12px;
          padding: 14px 18px;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .submit-btn {
          background: linear-gradient(135deg, #0b234a, #1d4694);
          color: #fff;
        }

        .reset-btn {
          background: rgba(29, 70, 148, 0.08);
          color: #0b234a;
          margin-top: 10px;
        }

        .submit-btn:hover, .reset-btn:hover {
          transform: translateY(-1px);
        }

        .success-box {
          text-align: center;
          padding: 16px 8px;
        }

        .success-icon {
          width: 62px;
          height: 62px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          margin: 0 auto 16px;
          background: rgba(22, 163, 74, 0.12);
          color: #0f9f5c;
          font-size: 2rem;
          font-weight: 700;
        }

        h3 {
          margin: 0 0 10px;
          color: #0b234a;
          font-size: 1.8rem;
        }

        .success-box p {
          color: #4b5875;
          line-height: 1.7;
          margin: 0;
        }

        .meeting-summary {
          margin: 18px 0 20px;
          padding: 16px;
          border: 1px solid rgba(29, 70, 148, 0.1);
          border-radius: 14px;
          background: rgba(29, 70, 148, 0.03);
          text-align: left;
        }

        .meeting-summary p {
          margin: 0 0 8px;
        }

        .meet-link {
          display: inline-block;
          margin-top: 10px;
          color: #0b234a;
          font-weight: 700;
          text-decoration: underline;
        }

        .error-text {
          margin: 0;
          color: #b42318;
          font-weight: 600;
        }

        @media (max-width: 820px) {
          .meeting-layout,
          .field-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
}
