import fastify from 'fastify'

import { ENV } from '../env'
import { routes } from './routes'

const app = fastify({
  logger: ENV.ENABLE_API_LOGGER,
})

app.register(routes, { prefix: 'v1' })

export { app }
