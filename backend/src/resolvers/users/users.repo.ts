import { ObjectId } from 'mongodb'
import { mongodb } from '../../mongo'

const USERS_COLLECTION = 'users'

type UserDocument = {
  firebaseUid: string
  email?: string
  displayName?: string
  photoURL?: string
}

function userCollection() {
  return mongodb.collection<UserDocument>(USERS_COLLECTION)
}

export async function createUser(userDocument: UserDocument) {
  return await userCollection().insertOne(userDocument)
}

export async function getUserByFirebaseUid(firebaseUid: string) {
  return await userCollection().findOne({ firebaseUid })
}

export async function getUser(_id: ObjectId) {
  return await userCollection().findOne({ _id })
}
