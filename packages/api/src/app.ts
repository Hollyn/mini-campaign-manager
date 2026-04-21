import express from 'express'

import { errorHandler, notFoundHandler } from './middleware/error-handler'
import { authRouter } from './routes/auth'
import { healthRouter } from './routes/health'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json())

  app.use('/api/auth', authRouter)
  app.use('/health', healthRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
