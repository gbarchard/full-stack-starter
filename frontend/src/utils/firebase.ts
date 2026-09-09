import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { env } from '../env'

const app = initializeApp(JSON.parse(env.VITE_FIREBASE_CREDS))
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
