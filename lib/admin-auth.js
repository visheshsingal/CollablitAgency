import crypto from 'crypto'

const COOKIE_NAME = 'collablit_admin_session'
const SESSION_TTL = 1000 * 60 * 60 * 12

function secret() {
  return process.env.ADMIN_SESSION_SECRET || 'change-this-admin-session-secret'
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex')
}

export function createSession(username) {
  const payload = Buffer.from(JSON.stringify({ username, expiresAt: Date.now() + SESSION_TTL })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function isValidSession(value) {
  if (!value) return false
  const [payload, signature] = value.split('.')
  if (!payload || !signature) return false

  const expected = sign(payload)
  const signaturesMatch = signature.length === expected.length && crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  if (!signaturesMatch) return false

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return Boolean(session.username && session.expiresAt > Date.now())
  } catch {
    return false
  }
}

export function getSessionCookie(req) {
  const cookies = req.headers.cookie || ''
  const match = cookies.split(';').map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
  return match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : null
}

export function requireAdmin(req, res) {
  if (!isValidSession(getSessionCookie(req))) {
    res.status(401).json({ message: 'Authentication required' })
    return false
  }
  return true
}

export function sessionCookie(value, maxAge = SESSION_TTL / 1000) {
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
}

export function clearSessionCookie() {
  return sessionCookie('', 0)
}
