import { Router } from 'express'

import {
  getCampaign,
  getCampaigns,
  patchCampaign,
  postCampaign,
  postScheduleCampaign,
  postSendCampaign,
  removeCampaign
} from '../controllers/campaign-controller'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.use(requireAuth)

router.get('/', getCampaigns)
router.post('/', postCampaign)
router.get('/:id', getCampaign)
router.patch('/:id', patchCampaign)
router.delete('/:id', removeCampaign)
router.post('/:id/schedule', postScheduleCampaign)
router.post('/:id/send', postSendCampaign)

export { router as campaignsRouter }
