import express from "express"
import cors from "cors"
import { mongodb, connectDb } from "./mongo.ts"

const app = express()
const port = 3000

app.use(cors())

app.get("/", async (req, res) => {
  // const collections = await mongodb.collections();
  // console.log(
  //   "names",
  //   collections.map((c) => c.collectionName),
  // );
  // await mongodb.collection("test").insertOne({ hello: "world" });
  return res.send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  connectDb()
})
