import { FastifyInstance } from 'fastify'

import { statusRoutes } from './status'

export function routes(app: FastifyInstance) {
  app.register(statusRoutes)
}
