import { getDatabase } from '../../lib/mongodb'
import { clearSessionCookie, createSession, hashPassword, normalizeEmail, requireClient, sessionCookie, verifyPassword } from '../../lib/client-auth'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearSessionCookie())
    return res.status(200).json({ success: true })
  }

  if (req.method === 'PATCH') {
    const email = requireClient(req, res)
    if (!email) return

    try {
      const currentPassword = String(req.body?.currentPassword || '')
      const newPassword = String(req.body?.newPassword || '')
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Current and new passwords are required.' })
      }
      if (newPassword.length < 8) {
        return res.status(400).json({ message: 'New password must be at least 8 characters.' })
      }

      const db = await getDatabase()
      const client = await db.collection('clients').findOne({ email })
      if (!client || !verifyPassword(currentPassword, client.passwordHash, client.passwordSalt)) {
        return res.status(401).json({ message: 'Current password is incorrect.' })
      }

      const { passwordHash, salt } = hashPassword(newPassword)
      await db.collection('clients').updateOne(
        { email },
        { $set: { passwordHash, passwordSalt: salt, updatedAt: new Date() } },
      )
      return res.status(200).json({ success: true })
    } catch (error) {
      console.error('Client password update error:', error)
      return res.status(503).json({ message: 'Could not update your password right now.' })
    }
  }

  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' })

  try {
    const email = normalizeEmail(req.body?.email)
    const password = String(req.body?.password || '')
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' })

    const db = await getDatabase()
    const client = await db.collection('clients').findOne({ email })
    if (!client || !verifyPassword(password, client.passwordHash, client.passwordSalt)) {
      return res.status(401).json({ message: 'Invalid email or password.' })
    }

    res.setHeader('Set-Cookie', sessionCookie(createSession(email)))
    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Client auth error:', error)
    return res.status(503).json({ message: 'Client portal is temporarily unavailable.' })
  }
}
