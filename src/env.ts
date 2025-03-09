import dotenv from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(dotenv.config({ path: `.env.${process.env.NODE_ENV}` }))

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  ENABLE_API_LOGGER: z.string().transform(value => value === 'true'),
  ENABLE_DATABASE_LOGGER: z.string().transform(value => value === 'true'),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  PORT: z.coerce.number(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
})

const env = envSchema.safeParse(process.env)

if (env.success === false) {
  throw new Error(
    `Invalid environment variables. ${JSON.stringify(env.error.format())}`,
  )
}

export const ENV = env.data
