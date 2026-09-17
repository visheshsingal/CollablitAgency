import { getDatabase } from '../../lib/mongodb'
import { requireClient } from '../../lib/client-auth'

function serialize(value) {
  return JSON.parse(JSON.stringify(value))
}

export default async function handler(req, res) {
  const email = requireClient(req, res)
  if (!email) return
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' })

  try {
    const db = await getDatabase()
    const client = await db.collection('clients').findOne(
      { email },
      { projection: { passwordHash: 0, passwordSalt: 0 } },
    )
    if (!client) return res.status(404).json({ message: 'Client account not found.' })

    const booking = await db.collection('bookings').findOne({ email }, { sort: { createdAt: -1 } })
    return res.status(200).json({ client: serialize(client), booking: serialize(booking || null) })
  } catch (error) {
    console.error('Client data error:', error)
    return res.status(503).json({ message: 'Client portal is temporarily unavailable.' })
  }
}
