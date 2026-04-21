import { Router } from 'express'

import { getCurrentUser, login, logout, register } from '../controllers/auth-controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.get('/me', requireAuth, getCurrentUser)
router.post('/logout', logout)

export { router as authRouter }
