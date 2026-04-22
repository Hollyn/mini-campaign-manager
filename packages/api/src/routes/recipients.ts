import { Router } from 'express'

import {
  getRecipients,
  patchRecipient,
  postRecipient,
  removeRecipient
} from '../controllers/recipient-controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.use(requireAuth)

router.get('/', getRecipients)
router.post('/', postRecipient)
router.patch('/:id', patchRecipient)
router.delete('/:id', removeRecipient)

export { router as recipientsRouter }
