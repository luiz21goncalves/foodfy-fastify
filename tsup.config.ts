import { defineConfig } from 'tsup'

export default defineConfig({
  clean: true,
  entry: ['src/server.ts'],
  minify: true,
  sourcemap: true,
  splitting: true,
  target: ['es2022'],
})
