import fastify from 'fastify'

import { routes } from './routes'

const app = fastify({
  logger: true,
})

app.register(routes, { prefix: 'v1' })

export { app }
