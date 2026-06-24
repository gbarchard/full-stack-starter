import { GraphQLScalarType, Kind } from 'graphql'

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    if (!(value instanceof Date)) {
      throw Error('Cannot Serialize Date')
    }
    return (value as Date).toISOString()
  },
  parseValue(value) {
    if (typeof value !== 'string') {
      throw Error('Cannot Parse Date')
    }
    return new Date(value as string)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  },
})

export { dateScalar as Date }
