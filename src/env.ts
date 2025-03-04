import dotenv from "dotenv";
import { expand } from 'dotenv-expand';
import { z } from "zod";

console.log(process.env.NODE_ENV)

expand(dotenv.config({path: `.env.${process.env.NODE_ENV}`}))

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', "production"]),
  PORT: z.coerce.number(),
})

const env = envSchema.safeParse(process.env)

if (env.success === false) {
  throw new Error(
    `Invalid environment variables. ${JSON.stringify(env.error.format())}`,
  )
}

export const ENV = env.data
