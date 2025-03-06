import { FastifyInstance } from 'fastify'

import { status } from '../../../models/status'

export function getStatus(app: FastifyInstance) {
  app.get('/status', async (_request, replay) => {
    const databaseVersion = await status.getDatabaseVersion()
    const databaseMaxConnections = await status.getDatabaseMaxConnections()
    const databaseOpenConnections = await status.getDatabaseOpenConnections()

    return replay.status(200).send({
      dependencies: {
        database: {
          max_connections: databaseMaxConnections,
          opened_connections: databaseOpenConnections,
          version: databaseVersion,
        },
      },
      updated_at: new Date().toISOString(),
    })
  })
}
