import express from 'express'

import { postRecipient } from './controllers/recipient-controller'
import { errorHandler, notFoundHandler } from './middleware/error-handler'
import { requireAuth } from './middleware/auth'
import { requireTrustedOrigin } from './middleware/trusted-origin'
import { authRouter } from './routes/auth'
import { campaignsRouter } from './routes/campaigns'
import { healthRouter } from './routes/health'
import { recipientsRouter } from './routes/recipients'

export const createApp = () => {
  const app = express()

  app.disable('x-powered-by')
  app.use(express.json({ limit: '1mb' }))
  app.use(requireTrustedOrigin)

  app.use('/auth', authRouter)
  app.use('/campaigns', campaignsRouter)
  app.use('/recipients', recipientsRouter)
  app.post('/recipient', requireAuth, postRecipient)
  app.use('/api/auth', authRouter)
  app.use('/api/campaigns', campaignsRouter)
  app.use('/api/recipients', recipientsRouter)
  app.post('/api/recipient', requireAuth, postRecipient)
  app.use('/health', healthRouter)

  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}
