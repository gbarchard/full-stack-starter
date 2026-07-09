import { ObjectId } from 'mongodb'
import { mongodb } from '../../mongo'

const ITEMS_COLLECTION = 'items'

interface ItemDocument {
  title: string
  userId: ObjectId
}

function itemsCollection() {
  return mongodb.collection<ItemDocument>(ITEMS_COLLECTION)
}

export async function addItem(item: ItemDocument) {
  return await itemsCollection().insertOne(item)
}

export async function getItemsByUserId(userId: ObjectId) {
  return await itemsCollection().find({ userId }).toArray()
}

export async function deleteItemById(_id: ObjectId) {
  return await itemsCollection().deleteOne({ _id })
}
