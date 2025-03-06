import { ENV } from '../env'
import { app } from './app'

app.listen({ host: '0.0.0.0', port: ENV.PORT })

const gracefulShutdown = () => {
  app.close(() => process.exit())
}

process.on('SIGINT', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)

process.on('uncaughtException', (error, origin) => {
  console.error(`uncaughtException origin ${origin}, ${error}`)
})

process.on('unhandledRejection', (error) => {
  console.error(`unhandledRejection, ${error}`)
})

process.on('exit', (code) => {
  console.info(`exit signal received with code ${code}`)
})
