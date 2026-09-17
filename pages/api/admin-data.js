import { ObjectId } from 'mongodb'
import { getDatabase } from '../../lib/mongodb'
import { requireAdmin } from '../../lib/admin-auth'

function serialize(value) {
  return JSON.parse(JSON.stringify(value))
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return

  try {
    const db = await getDatabase()
    const bookings = db.collection('bookings')
    const finance = db.collection('finance_transactions')

    if (req.method === 'GET') {
      const [bookingRows, financeRows, clientRows] = await Promise.all([
        bookings.find({}).sort({ createdAt: -1 }).limit(500).toArray(),
        finance.find({}).sort({ date: -1, createdAt: -1 }).limit(500).toArray(),
        db.collection('clients').find({}, { projection: { passwordHash: 0, passwordSalt: 0 } }).sort({ updatedAt: -1 }).limit(500).toArray(),
      ])
      return res.status(200).json({ bookings: serialize(bookingRows), finance: serialize(financeRows), clients: serialize(clientRows) })
    }

    if (req.method === 'POST') {
      const { action, email, status, progress, processSteps, document } = req.body || {}
      if (action === 'update-client') {
        if (!email) return res.status(400).json({ message: 'Client email is required.' })
        const update = { updatedAt: new Date() }
        if (typeof status === 'string' && status.trim()) update.status = status.trim()
        if (Number.isFinite(Number(progress))) update.progress = Math.min(100, Math.max(0, Number(progress)))
        if (Array.isArray(processSteps)) update.processSteps = processSteps
        const result = await db.collection('clients').updateOne({ email: String(email).trim().toLowerCase() }, { $set: update })
        if (!result.matchedCount) return res.status(404).json({ message: 'Client not found.' })
        return res.status(200).json({ success: true })
      }

      if (action === 'add-document') {
        if (!email || !document?.name || !document?.url) return res.status(400).json({ message: 'Client email, document name and URL are required.' })
        const documentRecord = { name: String(document.name).trim(), url: String(document.url).trim(), description: String(document.description || '').trim(), addedAt: new Date() }
        const result = await db.collection('clients').updateOne({ email: String(email).trim().toLowerCase() }, { $push: { documents: documentRecord }, $set: { updatedAt: new Date() } })
        if (!result.matchedCount) return res.status(404).json({ message: 'Client not found.' })
        return res.status(201).json({ document: serialize(documentRecord) })
      }

      const { type, client, category, amount, date, note } = req.body || {}
      const numericAmount = Number(amount)
      if (!['income', 'expense'].includes(type) || !client || !Number.isFinite(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ message: 'Type, client and a positive amount are required.' })
      }

      const transaction = {
        type,
        client: String(client).trim(),
        category: String(category || (type === 'income' ? 'Client payment' : 'Operating expense')).trim(),
        amount: numericAmount,
        date: date || new Date().toISOString().slice(0, 10),
        note: String(note || '').trim(),
        createdAt: new Date(),
      }
      const result = await finance.insertOne(transaction)
      return res.status(201).json({ transaction: serialize({ ...transaction, _id: result.insertedId }) })
    }

    if (req.method === 'DELETE') {
      const id = req.query.id
      if (!id || !ObjectId.isValid(id)) return res.status(400).json({ message: 'A valid transaction id is required.' })
      await finance.deleteOne({ _id: new ObjectId(id) })
      return res.status(200).json({ success: true })
    }

    return res.status(405).json({ message: 'Method not allowed' })
  } catch (error) {
    console.error('Admin data error:', error)
    return res.status(503).json({ message: 'Database unavailable. Check MongoDB Atlas network access and try again.' })
  }
}
