import { Router } from 'express'

import { sequelize } from '../config/database'
import { healthResponseSchema } from '../validations/health'

const router = Router()

router.get('/', async (_req, res, next) => {
  try {
    await sequelize.query('SELECT 1')

    const payload = healthResponseSchema.parse({
      service: 'api',
      status: 'ok',
      timestamp: new Date().toISOString()
    })

    res.status(200).json(payload)
  } catch (error) {
    next(error)
  }
})

export { router as healthRouter }
