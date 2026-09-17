import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error('Please define MONGODB_URI in your environment')
}

const options = { serverSelectionTimeoutMS: 8000 }

function getClientPromise() {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect().catch((error) => {
      global._mongoClientPromise = null
      throw error
    })
  }
  return global._mongoClientPromise
}

export async function getDatabase() {
  const connectedClient = await getClientPromise()
  return connectedClient.db(process.env.MONGODB_DB || 'collablit')
}
