import { ApolloServer } from '@apollo/server'
import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'
import { usersResolvers } from '../../../src/resolvers/users/users.resolve'
import { Context } from '../../context'
import { loggerPlugin } from './plugins'

const typesArray = loadFilesSync(
  path.join(import.meta.dirname, '../../resolvers/**/*.graphql'),
)

const typeDefs = mergeTypeDefs(typesArray)

export const server = new ApolloServer<Context>({
  typeDefs,
  resolvers: usersResolvers,
  plugins: [loggerPlugin],
})
