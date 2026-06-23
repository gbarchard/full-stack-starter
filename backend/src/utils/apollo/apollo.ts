import { ApolloServer } from '@apollo/server'
import { loadFiles, loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import path from 'path'
import { Context } from '../../context'
import { loggerPlugin } from './plugins'

export async function getServer() {
  const typesArray = loadFilesSync(
    path.join(import.meta.dirname, '../../resolvers/**/*.graphql'),
  )

  const typeDefs = mergeTypeDefs(typesArray)

  const resolversArray = await loadFiles(
    path.join(import.meta.dirname, '../../resolvers/**/*.resolve.ts'),
  )

  const resolvers = mergeResolvers(resolversArray)

  return new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [loggerPlugin],
  })
}
