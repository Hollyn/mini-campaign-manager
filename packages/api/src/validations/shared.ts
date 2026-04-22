import { z } from 'zod'

export const campaignStatuses = ['draft', 'sending', 'scheduled', 'sent'] as const
export const campaignRecipientStatuses = ['pending', 'sent', 'failed'] as const

export type CampaignStatus = (typeof campaignStatuses)[number]
export type CampaignRecipientStatus = (typeof campaignRecipientStatuses)[number]

export const campaignStatusSchema = z.enum(campaignStatuses)
export const campaignRecipientStatusSchema = z.enum(campaignRecipientStatuses)
export const apiErrorSchema = z.object({
  details: z.array(z.string()).optional(),
  error: z.string()
})
