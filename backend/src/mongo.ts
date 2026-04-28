import { Db, MongoClient } from "mongodb";

const url = "mongodb://host.docker.internal:27017";
const client = new MongoClient(url);

const dbName = "full_stack_starter";

let mongodb: Db;

async function main() {
  console.log("conntecting...");
  await client.connect();
  console.log("Connected successfully to server");
  mongodb = client.db(dbName);

  return "done.";
}

const connectDb = () => main().then(console.log).catch(console.error);

export { mongodb, connectDb };
