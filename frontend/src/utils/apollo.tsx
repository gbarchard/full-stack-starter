import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { PropsWithChildren } from 'react'

export function Apollo(props: PropsWithChildren<{ token: string }>) {
  const { token, children } = props

  const httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' })

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token,
      },
    }))

    return forward(operation)
  })

  const client = new ApolloClient({
    link: ApolloLink.from([authMiddleware, httpLink]),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
