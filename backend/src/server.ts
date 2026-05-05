import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import express from 'express'
import { server } from './apollo.ts'
import { auth } from './firebase.ts'
import { connectDb } from './mongo.ts'

async function startServer() {
  const app = express()

  await server.start()

  const port = 3000

  app.use(
    '/graphql',
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = req.headers['authorization']
        if (!token) return res.status(401).send()
        const decodedToken = await auth.verifyIdToken(token)
        return { decodedToken, userId: decodedToken.uid }
      },
    }),
  )

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
    connectDb()
  })
}

startServer()
