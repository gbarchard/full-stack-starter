import { ObjectId } from 'mongodb'

export interface Context {
  userId: ObjectId
  firebaseUid: string
}
