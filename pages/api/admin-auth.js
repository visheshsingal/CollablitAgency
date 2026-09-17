import { createSession, clearSessionCookie, sessionCookie } from '../../lib/admin-auth'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body || {}
    if (!username || !password || username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid username or password' })
    }

    res.setHeader('Set-Cookie', sessionCookie(createSession(username)))
    return res.status(200).json({ success: true })
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearSessionCookie())
    return res.status(200).json({ success: true })
  }

  return res.status(405).json({ message: 'Method not allowed' })
}
