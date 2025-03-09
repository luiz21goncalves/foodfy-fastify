import supertest from 'supertest'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { app } from '@/http/app'

const PATH = '/v1/status'

describe(`GET ${PATH}`, () => {
  beforeEach(async () => {
    vi.useFakeTimers()
    await app.ready()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Anonymous user', () => {
    test('Retrieving current system status', async () => {
      const updatedAt = new Date()
      vi.setSystemTime(updatedAt)

      const response = await supertest(app.server).get(PATH)

      expect(response.status).toEqual(200)
      expect(response.body).toStrictEqual({
        dependencies: {
          database: {
            max_connections: 100,
            opened_connections: 1,
            version: '17.4',
          },
        },
        updated_at: updatedAt.toISOString(),
      })
    })
  })
})
