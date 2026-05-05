import { type Resolvers } from '../../generated/graphql.ts'

export const usersResolvers: Resolvers = {
  Query: {
    user: (_, __, context) => {
      return {
        id: context.userId,
        name: '',
      }
    },
  },
}
