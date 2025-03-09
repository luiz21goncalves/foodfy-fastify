import tsConfigPaths from 'vite-tsconfig-paths'
import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    coverage: {
      exclude: [
        ...defaultExclude,
        '*.config.*',
        './tests/integration/setup.ts',
      ],
      provider: 'v8',
      reporter: ['text-summary', 'lcov'],
    },
    env: { NODE_ENV: 'test' },
    environment: 'node',
    globals: false,
    reporters: 'verbose',
  },
})
