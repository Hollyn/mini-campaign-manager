import 'reflect-metadata'

import { createApp } from './app'
import { sequelize } from './config/database'
import { env } from './config/env'

const startServer = async () => {
  await sequelize.authenticate()

  const app = createApp()

  app.listen(env.PORT, () => {
    console.log(`API listening on port ${env.PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Failed to start API', error)
  process.exit(1)
})
