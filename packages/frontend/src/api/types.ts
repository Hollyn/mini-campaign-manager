export const campaignStatuses = ['draft', 'sending', 'scheduled', 'sent'] as const
export const campaignRecipientStatuses = ['pending', 'sent', 'failed'] as const

export type CampaignStatus = (typeof campaignStatuses)[number]
export type CampaignRecipientStatus = (typeof campaignRecipientStatuses)[number]

export interface ApiError {
  error: string
  details?: string[]
}

export interface HealthResponse {
  service: 'api'
  status: 'ok'
  timestamp: string
}
