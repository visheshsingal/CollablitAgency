import crypto from 'crypto'

const COOKIE_NAME = 'collablit_client_session'
const SESSION_TTL = 1000 * 60 * 60 * 24 * 14

function secret() {
  return process.env.ADMIN_SESSION_SECRET || 'change-this-client-session-secret'
}

function sign(value) {
  return crypto.createHmac('sha256', secret()).update(value).digest('hex')
}

export function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function createPassword() {
  return crypto.randomBytes(6).toString('base64url')
}

export function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const passwordHash = crypto.scryptSync(password, salt, 64).toString('hex')
  return { passwordHash, salt }
}

export function verifyPassword(password, passwordHash, salt) {
  const candidate = crypto.scryptSync(password, salt, 64).toString('hex')
  return candidate.length === passwordHash.length && crypto.timingSafeEqual(Buffer.from(candidate), Buffer.from(passwordHash))
}

export function createSession(email) {
  const payload = Buffer.from(JSON.stringify({ email: normalizeEmail(email), expiresAt: Date.now() + SESSION_TTL })).toString('base64url')
  return `${payload}.${sign(payload)}`
}

export function getSessionEmail(req) {
  const cookies = req.headers.cookie || ''
  const match = cookies.split(';').map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`))
  const value = match ? decodeURIComponent(match.slice(COOKIE_NAME.length + 1)) : ''
  if (!value) return null
  const [payload, signature] = value.split('.')
  if (!payload || !signature) return null
  const expected = sign(payload)
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null
  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return session.expiresAt > Date.now() ? session.email : null
  } catch {
    return null
  }
}

export function requireClient(req, res) {
  const email = getSessionEmail(req)
  if (!email) {
    res.status(401).json({ message: 'Client login required' })
    return null
  }
  return email
}

export function sessionCookie(value, maxAge = SESSION_TTL / 1000) {
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`
}

export function clearSessionCookie() {
  return sessionCookie('', 0)
}
