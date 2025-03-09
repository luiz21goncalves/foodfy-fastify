import { defineConfig } from 'drizzle-kit'

import { ENV } from '@/env'

export default defineConfig({
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  dialect: 'postgresql',
})
