import express from 'express'
import cors from 'cors'
import { connectDb } from './mongo.ts'

const app = express()
const port = 3000

app.use(cors())

app.get('/', async (req, res) => {
  return res.send('Yo')
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  connectDb()
})
