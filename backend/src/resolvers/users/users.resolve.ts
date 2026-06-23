import { type Resolvers } from '../../generated/graphql'
import { getUser } from './users.repo'

export const usersResolvers: Resolvers = {
  Query: {
    user: async (_, __, context) => {
      const user = await getUser(context.userId)
      return {
        id: context.userId.toString(),
        name: user?.displayName,
        firebaseUid: context.firebaseUid,
        photoURL: user?.photoURL,
      }
    },
  },
}
