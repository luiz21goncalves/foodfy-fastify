import { FastifyInstance } from 'fastify'
import z from 'zod'

import { status } from '../../../models/status'

export function getStatus(app: FastifyInstance) {
  app.get(
    '/status',
    {
      schema: {
        response: {
          200: z
            .object({
              dependencies: z.object({
                database: z.object({
                  max_connections: z.number(),
                  opened_connections: z.number(),
                  version: z.string(),
                }),
              }),
              updated_at: z.string(),
            })
            .describe('Status response'),
        },
        summary: 'Application status',
        tags: ['Status'],
      },
    },
    async (_request, replay) => {
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
    },
  )
}
