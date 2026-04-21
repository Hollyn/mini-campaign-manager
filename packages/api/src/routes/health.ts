import { Router } from 'express'

import { healthResponseSchema } from '../validations/health'

const router = Router()

router.get('/', (_req, res) => {
  const payload = healthResponseSchema.parse({
    service: 'api',
    status: 'ok',
    timestamp: new Date().toISOString()
  })

  res.status(200).json(payload)
})

export { router as healthRouter }
