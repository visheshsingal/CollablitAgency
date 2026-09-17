import { getDatabase } from '../../lib/mongodb'
import { clearSessionCookie, createSession, normalizeEmail, sessionCookie, verifyPassword } from '../../lib/client-auth'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearSessionCookie())
    return res.status(200).json({ success: true })
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
