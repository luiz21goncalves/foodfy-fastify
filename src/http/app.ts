import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { ENV } from '@/env'

import { routes } from './routes'

const app = fastify({
  logger: ENV.ENABLE_API_LOGS,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(routes, { prefix: 'v1' })

export { app }
