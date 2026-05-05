import { type DecodedIdToken } from 'firebase-admin/auth'

export interface Context {
  decodedToken: DecodedIdToken
  userId: string
}
