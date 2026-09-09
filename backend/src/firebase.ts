import { cert, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { env } from './env'
import { logger } from './utils'

const firebaseCreds = JSON.parse(env.FIREBASE_CREDS)

if (!firebaseCreds) {
  throw new Error('Firebase credentials not found')
}

const app = initializeApp({
  credential: cert(firebaseCreds as ServiceAccount),
})

logger.info(`Initialized firebase: ${app.name}`)

export const auth = getAuth()
