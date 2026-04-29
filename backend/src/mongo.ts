import { Db, MongoClient } from "mongodb"

const url = "mongodb://host.docker.internal:27017"
const client = new MongoClient(url)

const dbName = "full_stack_starter"

let mongodb: Db

async function main() {
  await client.connect()
  mongodb = client.db(dbName)

  return "Conneced to mongo"
}

const connectDb = () => main().then(console.log).catch(console.error)

export { mongodb, connectDb }
