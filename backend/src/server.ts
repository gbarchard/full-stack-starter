import express from 'express'
import cors from 'cors'
import { connectDb } from './mongo.ts'
import { auth } from './firebase.ts'
import { getContext, setContext } from './context.ts'

const app = express()
const port = 3000

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
)

app.use(async function (req, res, next) {
  const token = req.headers['authorization']
  if (!token) return res.status(401).send()

  try {
    const decodedToken = await auth.verifyIdToken(token)
    setContext(req, { decodedToken, userId: decodedToken?.uid })
  } catch (e) {
    console.error(e)
    return res.status(401).send()
  }

  next()
})

app.get('/', async (req, res) => {
  const context = getContext(req)
  return res.send(context?.userId)
})

app.get('/user', async (req, res) => {
  const context = getContext(req)
  return res.send(context).status(200)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
  connectDb()
})
