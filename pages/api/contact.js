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
      <h2>New meeting request</h2>
      <p><strong>Name:</strong> ${data.name || 'N/A'}</p>
      <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Agenda:</strong> ${data.agenda || 'N/A'}</p>
      <p><strong>Goals:</strong> ${data.goals || 'N/A'}</p>
      <p><strong>Timeline:</strong> ${data.timeline || 'N/A'}</p>
      <p><strong>Budget:</strong> ${data.budget || 'N/A'}</p>
      <p><strong>Preferred Date:</strong> ${data.meetingDate || 'N/A'}</p>
      <p><strong>Preferred Time:</strong> ${data.meetingTime || 'N/A'}</p>
      <p><strong>Duration:</strong> ${data.duration || '30 mins'}</p>
      <p><strong>Google Meet Link:</strong> <a href="${meetLink || '#'}">${meetLink || 'N/A'}</a></p>
      <p><strong>Additional notes:</strong></p>
      <p>${(data.message || 'N/A').replace(/\n/g, '<br />')}</p>
    `,
  }
}

function formatUserMeetingEmail(data, meetLink) {
  return {
    subject: 'Your Google Meet session is booked',
    text: [
      `Hi ${data.name || 'there'},`,
      '',
      'Thanks for booking a meeting with Collablit Solutions.',
      `Date: ${data.meetingDate || 'To be confirmed'}`,
      `Time: ${data.meetingTime || 'To be confirmed'}`,
      `Duration: ${data.duration || '30 mins'}`,
      `Google Meet Link: ${meetLink || 'N/A'}`,
      '',
      'Click the link to join the meeting.',
      '',
      'Regards,',
      'Collablit Solutions',
    ].join('\n'),
    html: `
      <h2>Your Google Meet session is booked</h2>
      <p>Hi ${data.name || 'there'},</p>
      <p>Thanks for booking a meeting with Collablit Solutions.</p>
      <p><strong>Date:</strong> ${data.meetingDate || 'To be confirmed'}</p>
      <p><strong>Time:</strong> ${data.meetingTime || 'To be confirmed'}</p>
      <p><strong>Duration:</strong> ${data.duration || '30 mins'}</p>
      <p><strong>Google Meet Link:</strong> <a href="${meetLink || '#'}">${meetLink || 'N/A'}</a></p>
      <p>Click the link above to join the meeting.</p>
      <p>Regards,<br />Collablit Solutions</p>
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
