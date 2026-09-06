import nodemailer from 'nodemailer'

const toEmail = process.env.TO_EMAIL || 'vishesh.singal.contact@gmail.com'

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

function formatMeetingEmail(data) {
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
      <p><strong>Additional notes:</strong></p>
      <p>${(data.message || 'N/A').replace(/\n/g, '<br />')}</p>
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

  const mailData = type === 'meeting' ? formatMeetingEmail(cleaned) : formatContactEmail(cleaned)

  if (!transporter) {
    console.log('[contact-form]', type, cleaned)
    return res.status(200).json({
      success: true,
      message: 'Form captured successfully. Add EMAIL_USER and EMAIL_PASS in your environment to send emails automatically.',
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

    return res.status(200).json({ success: true, message: 'Message sent successfully.' })
  } catch (error) {
    console.error('Email send failed:', error)
    return res.status(500).json({ message: 'Unable to send email right now.' })
  }
}
