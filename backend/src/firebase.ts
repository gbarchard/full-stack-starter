import { cert, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import firebaseCreds from '../firebase-creds.json' with { type: 'json' }
import { logger } from './utils'

if (!firebaseCreds) {
  throw new Error('Firebase credentials not found')
}

const app = initializeApp({
  credential: cert(firebaseCreds as ServiceAccount),
})

logger.info(`Initialized firebase: ${app.name}`)

export const auth = getAuth()
