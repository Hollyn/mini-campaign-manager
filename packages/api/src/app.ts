import express from 'express'

import { errorHandler, notFoundHandler } from './middleware/error-handler'
import { authRouter } from './routes/auth'
import { campaignsRouter } from './routes/campaigns'
import { healthRouter } from './routes/health'
import { recipientsRouter } from './routes/recipients'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json())

  app.use('/api/auth', authRouter)
  app.use('/api/campaigns', campaignsRouter)
  app.use('/api/recipients', recipientsRouter)
  app.use('/health', healthRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
