import { expressMiddleware } from '@as-integrations/express5'
import cors from 'cors'
import express from 'express'
import { server } from './apollo'
import { type Context } from './context'
import { auth } from './firebase'
import { connectDb } from './mongo'
import { createUser, getUserByFirebaseUid } from './resolvers/users/users.repo'

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
        if (!token) return res.status(401).send('Missing Token')
        const decodedToken = await auth.verifyIdToken(token)
        const firebaseUid = decodedToken.uid
        const user = await getUserByFirebaseUid(firebaseUid)
        if (!user) return res.status(401).send('User Not Found')
        return {
          userId: user._id,
          firebaseUid,
        } satisfies Context
      },
    }),
  )

  app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

  app.post(
    '/create-user-if-necessary',

    express.json(),
    async (req, res) => {
      const token = req.headers['authorization']

      if (!token) {
        return res.status(401).send('Missing Token')
      }

      const decodedToken = await auth.verifyIdToken(token)
      const firebaseUid = decodedToken.uid
      const existingUser = await getUserByFirebaseUid(firebaseUid)

      if (existingUser) {
        return res.status(200).send()
      }

      const firebaseUser = await auth.getUser(firebaseUid)

      await createUser({
        firebaseUid,
        displayName: firebaseUser.displayName,
        email: firebaseUser.email,
        photoURL: firebaseUser.photoURL,
      })
      return res.status(200).send()
    },
  )

  app.listen(port, () => {
    console.log(`listening on port ${port}`)
    connectDb()
  })
}

startServer()
