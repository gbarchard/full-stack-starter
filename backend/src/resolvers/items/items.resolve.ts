import { ObjectId } from 'mongodb'
import { Resolvers } from '../../generated/graphql'
import { addItem, deleteItemById, getItemsByUserId } from './items.repo'

export default {
  Query: {
    items: async (_, __, ctx) => {
      return await getItemsByUserId(ctx.userId)
    },
  },
  Mutation: {
    addItem: async (_, input, ctx) => {
      const res = await addItem({
        title: input.addItemInput.title,
        userId: ctx.userId,
      })
      return res.insertedId
    },
    deleteItem: async (_, input) => {
      const res = await deleteItemById(input.itemId)
      return res.acknowledged
    },
  },
  Item: {
    createdDate,
  },
} satisfies Resolvers

function createdDate(mongoObject: { _id?: ObjectId }) {
  return mongoObject._id!.getTimestamp()
}
