import * as z from 'zod'

export const env = z
  .object({
    MONGO_URL: z
      .url()
      .optional()
      .default('mongodb://host.docker.internal:27017'),
    CLIENT_URL: z.url().optional().default('http://localhost:5173'),
    FIREBASE_CREDS: z.string(),
  })
  .parse(process.env)
