import { sql } from 'drizzle-orm'

import { db } from '@/db'
import { ENV } from '@/env'

export const status = {
  getDatabaseMaxConnections: async () => {
    const result = await db.execute<{ max_connections: string }>(sql`
      SHOW max_connections
    `)

    return Number(result.rows[0].max_connections)
  },
  getDatabaseOpenConnections: async () => {
    const result = await db.execute<{ count: number }>(sql`
      SELECT
        count(*)::int
      FROM
        pg_stat_activity
      WHERE
        datname = ${ENV.POSTGRES_DB}
    `)

    return result.rows[0].count
  },
  getDatabaseVersion: async () => {
    const result = await db.execute<{ server_version: string }>(sql`
      SHOW server_version
    `)

    return result.rows[0].server_version
  },
}
