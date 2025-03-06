import { FastifyInstance } from 'fastify'

import { getStatus } from './get-status'

export function statusRoutes(app: FastifyInstance) {
  app.register(getStatus)
}
