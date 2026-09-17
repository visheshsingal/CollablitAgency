import nodemailer from 'nodemailer'
import { hashPassword, normalizeEmail } from '../../lib/client-auth'

const toEmail = process.env.TO_EMAIL

function generateGoogleMeetLink() {
  const randomSegment = () =>
    Math.random().toString(36).replace(/[^a-z0-9]/g, '').slice(0, 4).padEnd(4, 'x')

  return `https://meet.google.com/${randomSegment()}-${randomSegment()}-${randomSegment()}`.toLowerCase()
}

function formatContactEmail(data) {
  return {
    subject: `New contact enquiry from ${data.name || 'website'}`,
    text: [
      `Name: ${data.name || 'N/A'}`,
      `Email: ${data.email || 'N/A'}`,
      `Service: ${data.project || 'N/A'}`,
      `Design Type: ${data.designType || 'N/A'}`,
      `Custom Design: ${data.customDesign || 'N/A'}`,
      '',
      'Project Details:',
      data.message || 'N/A',
    ].join('\n'),
    html: `
      <h2>New contact enquiry</h2>
      <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
      <p><strong>Service:</strong> ${data.project || 'N/A'}</p>
      <p><strong>Design Type:</strong> ${data.designType || 'N/A'}</p>
      <p><strong>Custom Design:</strong> ${data.customDesign || 'N/A'}</p>
      <p><strong>Project Details:</strong></p>
      <p>${(data.message || 'N/A').replace(/\n/g, '<br />')}</p>
    `,
  }
}

function formatClientWelcomeEmail(data, meetLink, username, password) {
  const bookingBlock = `
    <div style="background:#f8f8f8;border:1px solid #e8e8e8;border-radius:14px;padding:18px 20px;margin:18px 0;">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#7a6b4a;font-weight:700;margin-bottom:10px;">Your Session</div>
      <p style="margin:5px 0;color:#1f2b3a;"><strong>Date:</strong> ${data.meetingDate || 'To be confirmed'}</p>
      <p style="margin:5px 0;color:#1f2b3a;"><strong>Time:</strong> ${data.meetingTime || 'To be confirmed'}</p>
      <p style="margin:5px 0;color:#1f2b3a;"><strong>Duration:</strong> ${data.duration || '30 mins'}</p>
      <p style="margin:10px 0 0;color:#1f2b3a;"><strong>Google Meet Link:</strong> <a href="${meetLink || '#'}" style="color:#0d2b5f;">${meetLink || 'Not available yet'}</a></p>
    </div>
  `

  return {
    subject: 'Your Collablit meeting and client portal access',
    text: [
      `Hi ${data.name || 'there'},`,
      '',
      'Thanks for booking a strategy call with Collablit Solutions.',
      `Date: ${data.meetingDate || 'To be confirmed'}`,
      `Time: ${data.meetingTime || 'To be confirmed'}`,
      `Duration: ${data.duration || '30 mins'}`,
      `Google Meet Link: ${meetLink || 'N/A'}`,
      '',
      'Client portal access:',
      `Username: ${username}`,
      `Password: ${password || 'Your existing portal password'}`,
      '',
      'Click the meeting link to join the call.',
      '',
      'See you soon,',
      'Collablit Solutions',
    ].join('\n'),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f3f1ed;padding:30px 0;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5ddd0;border-radius:18px;overflow:hidden;box-shadow:0 18px 55px rgba(12,28,52,0.08);">
          <div style="background:linear-gradient(135deg,#0f223c,#1d4694);padding:26px 30px;color:#fff;">
            <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#e2c77d;font-weight:700;">Collablit Solutions</div>
            <h2 style="margin:10px 0 0;font-size:28px;line-height:1.3;">Your Meeting &amp; Portal Access</h2>
          </div>
          <div style="padding:28px 30px; color:#1e2a3b;">
            <p style="margin:0 0 12px;">Hi ${data.name || 'there'},</p>
            <p style="margin:0 0 18px;line-height:1.7;">Thanks for booking a strategy call with us. We&apos;re looking forward to speaking with you.</p>
            ${bookingBlock}
            <div style="background:#f7f5ef;border:1px solid #e7dcc0;border-radius:14px;padding:18px 20px;margin:18px 0;">
              <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8a6a22;font-weight:700;margin-bottom:10px;">Client Portal Login</div>
              <p style="margin:5px 0;color:#1e2a3b;"><strong>Username:</strong> ${username}</p>
              <p style="margin:5px 0;color:#1e2a3b;"><strong>Password:</strong> ${password || 'Your existing portal password'}</p>
            </div>
            <p style="margin:18px 0 0;line-height:1.7;">Click the meeting link above to join your call. If anything changes, we&apos;ll reach out.</p>
            <p style="margin:18px 0 0;">Warm regards,<br /><strong>Collablit Solutions</strong></p>
          </div>
        </div>
      </div>
    `,
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const body = req.body || {}
  const type = body.type || 'contact'
  const cleaned = { ...body }
  delete cleaned.type

  const emailConfig = {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }

  const transporter = process.env.EMAIL_USER && process.env.EMAIL_PASS
    ? nodemailer.createTransport(emailConfig)
    : null

  const meetLink = type === 'meeting' ? generateGoogleMeetLink() : null
  const mailData = formatContactEmail(cleaned)
  let clientAccess = null
  let bookingError = null

  if (type === 'meeting') {
    try {
      const { getDatabase } = await import('../../lib/mongodb')
      const { ObjectId } = await import('mongodb')
      const db = await getDatabase()
      const email = normalizeEmail(cleaned.email)
      const existingClient = await db.collection('clients').findOne({ email })
      const password = existingClient ? null : String(cleaned.name || '').trim()
      const credentials = password ? hashPassword(password) : null
      const initialClient = {
        email,
        username: email,
        status: 'Onboarding',
        progress: 10,
        processSteps: [
          { key: 'discovery', label: 'Discovery call', status: 'current' },
          { key: 'strategy', label: 'Strategy and scope', status: 'upcoming' },
          { key: 'production', label: 'Production', status: 'upcoming' },
          { key: 'delivery', label: 'Delivery', status: 'upcoming' },
        ],
        documents: [],
        createdAt: new Date(),
      }
      if (credentials) {
        initialClient.passwordHash = credentials.passwordHash
        initialClient.passwordSalt = credentials.salt
        clientAccess = { username: email, password }
      }
      const clientResult = await db.collection('clients').updateOne(
        { email },
        {
          $set: { name: cleaned.name, company: cleaned.company, updatedAt: new Date() },
          $setOnInsert: initialClient,
        },
        { upsert: true },
      )
      await db.collection('bookings').insertOne({
        ...cleaned,
        email,
        clientId: existingClient?._id || clientResult.upsertedId || new ObjectId(),
        meetLink,
        status: 'new',
        createdAt: new Date(),
      })
    } catch (error) {
      console.error('Booking database save failed:', error)
      bookingError = error
    }
  }

  if (type === 'meeting' && bookingError) {
    return res.status(503).json({ message: 'We could not create your client portal right now. Please try again in a moment.' })
  }

  if (!transporter) {
    console.log('[contact-form]', type, cleaned)
    return res.status(200).json({
      success: true,
      message: 'Form captured successfully. Add EMAIL_USER and EMAIL_PASS in your environment to send emails automatically.',
      meetLink: meetLink || null,
      meetingDate: cleaned.meetingDate || null,
      meetingTime: cleaned.meetingTime || null,
      duration: cleaned.duration || null,
      clientUsername: clientAccess?.username || null,
      clientPassword: clientAccess?.password || null,
    })
  }

  try {
    if (type !== 'meeting' && toEmail) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: toEmail,
        replyTo: cleaned.email || process.env.EMAIL_USER,
        subject: mailData.subject,
        text: mailData.text,
        html: mailData.html,
      })
    }

    if (type === 'meeting' && cleaned.email) {
      const userMail = formatClientWelcomeEmail(cleaned, meetLink, clientAccess?.username || normalizeEmail(cleaned.email), clientAccess?.password || cleaned.name)
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: cleaned.email,
        replyTo: toEmail,
        subject: userMail.subject,
        text: userMail.text,
        html: userMail.html,
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      meetLink,
      meetingDate: cleaned.meetingDate || null,
      meetingTime: cleaned.meetingTime || null,
      duration: cleaned.duration || null,
      clientUsername: clientAccess?.username || null,
      clientPassword: clientAccess?.password || null,
    })
  } catch (error) {
    console.error('Email send failed:', error)
    return res.status(500).json({ message: 'Unable to send email right now.' })
  }
}
