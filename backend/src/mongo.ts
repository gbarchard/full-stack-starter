import { Db, MongoClient } from 'mongodb'
import { logger } from './utils'

const url = 'mongodb://host.docker.internal:27017'
const client = new MongoClient(url)

const dbName = 'full_stack_starter'

let mongodb: Db

async function main() {
  await client.connect()
  mongodb = client.db(dbName)

  return 'Conneced to mongo'
}

const connectDb = () => main().then(logger.info).catch(logger.error)

export { connectDb, mongodb }
