import nodemailer from 'nodemailer'

const toEmail = process.env.TO_EMAIL || 'vishesh.singal.contact@gmail.com'

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

function formatMeetingEmail(data, meetLink) {
  const meetingSummary = `
    <div style="background:#f7f5ef;border:1px solid #e7dcc0;border-radius:14px;padding:18px 20px;margin:18px 0;">
      <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#8a6a22;font-weight:700;margin-bottom:10px;">Meeting Details</div>
      <p style="margin:5px 0;color:#1e2a3b;"><strong>Date:</strong> ${data.meetingDate || 'TBD'}</p>
      <p style="margin:5px 0;color:#1e2a3b;"><strong>Time:</strong> ${data.meetingTime || 'TBD'}</p>
      <p style="margin:5px 0;color:#1e2a3b;"><strong>Duration:</strong> ${data.duration || '30 mins'}</p>
      <p style="margin:10px 0 0;color:#1e2a3b;"><strong>Meet Link:</strong> <a href="${meetLink || '#'}" style="color:#0d2b5f;">${meetLink || 'Not generated yet'}</a></p>
    </div>
  `

  return {
    subject: `New meeting request from ${data.name || 'website'}`,
    text: [
      `Name: ${data.name || 'N/A'}`,
      `Email: ${data.email || 'N/A'}`,
      `Company: ${data.company || 'N/A'}`,
      `Agenda: ${data.agenda || 'N/A'}`,
      `Goals: ${data.goals || 'N/A'}`,
      `Timeline: ${data.timeline || 'N/A'}`,
      `Budget: ${data.budget || 'N/A'}`,
      `Preferred Date: ${data.meetingDate || 'N/A'}`,
      `Preferred Time: ${data.meetingTime || 'N/A'}`,
      `Duration: ${data.duration || '30 mins'}`,
      `Google Meet Link: ${meetLink || 'N/A'}`,
      '',
      'Additional notes:',
      data.message || 'N/A',
    ].join('\n'),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f4f1;padding:30px 0;">
        <div style="max-width:650px;margin:0 auto;background:#ffffff;border:1px solid #ece2c7;border-radius:18px;overflow:hidden;box-shadow:0 18px 55px rgba(12,28,52,0.08);">
          <div style="background:linear-gradient(135deg,#0c2245,#1d4694);padding:26px 30px;color:#fff;">
            <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d7c18a;font-weight:700;">Collablit Solutions</div>
            <h2 style="margin:10px 0 0;font-size:28px;line-height:1.3;">New Meeting Request</h2>
          </div>
          <div style="padding:28px 30px 10px; color:#1e2a3b;">
            <p style="margin:0 0 12px;"><strong>Name:</strong> ${data.name || 'N/A'}</p>
            <p style="margin:0 0 12px;"><strong>Email:</strong> ${data.email || 'N/A'}</p>
            <p style="margin:0 0 12px;"><strong>Company:</strong> ${data.company || 'N/A'}</p>
            <p style="margin:0 0 12px;"><strong>Agenda:</strong> ${data.agenda || 'N/A'}</p>
            <p style="margin:0 0 12px;"><strong>Goals:</strong> ${data.goals || 'N/A'}</p>
            <p style="margin:0 0 12px;"><strong>Timeline:</strong> ${data.timeline || 'N/A'}</p>
            <p style="margin:0 0 12px;"><strong>Budget:</strong> ${data.budget || 'N/A'}</p>
            ${meetingSummary}
            <p style="margin:18px 0 8px;"><strong>Additional notes:</strong></p>
            <p style="margin:0;line-height:1.7;color:#33415a;">${(data.message || 'N/A').replace(/\n/g, '<br />')}</p>
          </div>
        </div>
      </div>
    `,
  }
}

function formatUserMeetingEmail(data, meetLink) {
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
    subject: 'Your strategy call is booked with Collablit Solutions',
    text: [
      `Hi ${data.name || 'there'},`,
      '',
      'Thanks for booking a strategy call with Collablit Solutions.',
      `Date: ${data.meetingDate || 'To be confirmed'}`,
      `Time: ${data.meetingTime || 'To be confirmed'}`,
      `Duration: ${data.duration || '30 mins'}`,
      `Google Meet Link: ${meetLink || 'N/A'}`,
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
            <h2 style="margin:10px 0 0;font-size:28px;line-height:1.3;">Your Strategy Call Is Booked</h2>
          </div>
          <div style="padding:28px 30px; color:#1e2a3b;">
            <p style="margin:0 0 12px;">Hi ${data.name || 'there'},</p>
            <p style="margin:0 0 18px;line-height:1.7;">Thanks for booking a strategy call with us. We&apos;re looking forward to speaking with you.</p>
            ${bookingBlock}
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
  const mailData = type === 'meeting' ? formatMeetingEmail(cleaned, meetLink) : formatContactEmail(cleaned)

  if (!transporter) {
    console.log('[contact-form]', type, cleaned)
    return res.status(200).json({
      success: true,
      message: 'Form captured successfully. Add EMAIL_USER and EMAIL_PASS in your environment to send emails automatically.',
      meetLink: meetLink || null,
      meetingDate: cleaned.meetingDate || null,
      meetingTime: cleaned.meetingTime || null,
      duration: cleaned.duration || null,
    })
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: toEmail,
      replyTo: cleaned.email || process.env.EMAIL_USER,
      subject: mailData.subject,
      text: mailData.text,
      html: mailData.html,
    })

    if (type === 'meeting' && cleaned.email) {
      const userMail = formatUserMeetingEmail(cleaned, meetLink)
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
    })
  } catch (error) {
    console.error('Email send failed:', error)
    return res.status(500).json({ message: 'Unable to send email right now.' })
  }
}
