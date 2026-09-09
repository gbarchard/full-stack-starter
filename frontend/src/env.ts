import * as z from 'zod'

export const env = z
  .object({
    VITE_SERVER_URL: z.url().optional().default('http://localhost:3000'),
    VITE_FIREBASE_CREDS: z.string(),
  })
  .parse(import.meta.env)
