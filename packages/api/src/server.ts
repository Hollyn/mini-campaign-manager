import 'reflect-metadata'

import { createApp } from './app'
import { sequelize } from './config/database'
import { env } from './config/env'
import { startCampaignProcessing } from './services/campaign-processing-service'

const SHUTDOWN_TIMEOUT_MS = 10_000

const startServer = async () => {
  await sequelize.authenticate()

  const app = createApp()
  const stopCampaignProcessing = await startCampaignProcessing()

  const server = app.listen(env.PORT, () => {
    console.log(`API listening on port ${env.PORT}`)
  })
  let isShuttingDown = false

  const shutdown = async (signal: string) => {
    if (isShuttingDown) {
      return
    }

    isShuttingDown = true

    console.log(`Received ${signal}. Shutting down API.`)

    const shutdownTimeout = setTimeout(() => {
      console.error('Forced shutdown after timeout')
      process.exit(1)
    }, SHUTDOWN_TIMEOUT_MS)

    shutdownTimeout.unref()

    try {
      stopCampaignProcessing()

      await new Promise<void>((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error)

            return
          }

          resolve()
        })
      })

      await sequelize.close()
      clearTimeout(shutdownTimeout)
      process.exit(0)
    } catch (error) {
      console.error('Failed to shutdown API cleanly', error)
      process.exit(1)
    }
  }

  process.on('SIGINT', () => {
    void shutdown('SIGINT')
  })

  process.on('SIGTERM', () => {
    void shutdown('SIGTERM')
  })
}

startServer().catch((error) => {
  console.error('Failed to start API', error)
  process.exit(1)
})
