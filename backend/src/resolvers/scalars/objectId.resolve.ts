import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

const objectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo Id',
  serialize(value) {
    if (!(value instanceof ObjectId)) {
      throw Error('Cannot Serialize Object Id')
    }
    return value.toString()
  },
  parseValue(value) {
    if (typeof value !== 'string') {
      throw Error('Cannot Parse Object Id')
    }
    return new ObjectId(value)
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value)
    }
    return null
  },
})

export { objectIdScalar as ObjectId }
