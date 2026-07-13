import * as z from 'zod'

export const env = z
  .object({
    SERVER_URL: z.url().optional().default('http://localhost:3000'),
  })
  .parse(import.meta.env)
