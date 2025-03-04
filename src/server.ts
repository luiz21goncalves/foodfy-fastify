import { app } from "./app";
import { ENV } from "./env";

app.listen({port: ENV.PORT, host: '0.0.0.0'}).then(address => {
  console.info('Server running at:', address)
}).catch(err => {
  console.error(err)
})

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
