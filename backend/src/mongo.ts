import { Db, MongoClient } from 'mongodb'
import { env } from './env'
import { logger } from './utils'

const client = new MongoClient(env.MONGO_URL)

const dbName = 'full_stack_starter'

let mongodb: Db

async function main() {
  await client.connect()
  mongodb = client.db(dbName)

  return 'Conneced to mongo'
}

const connectDb = () => main().then(logger.info).catch(logger.error)

export { connectDb, mongodb }
