import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: true,
  target: ['es2022']
})