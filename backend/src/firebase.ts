import { initializeApp, cert, type ServiceAccount } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import firebaseCreds from '../firebase-creds.json' with { type: 'json' }

if (!firebaseCreds) {
  throw new Error('Firebase credentials not found')
}

const app = initializeApp({
  credential: cert(firebaseCreds as ServiceAccount),
})

console.log('Initialized firebase: ', app.name)

export const auth = getAuth()
