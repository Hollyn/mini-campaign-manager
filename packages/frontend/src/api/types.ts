export const campaignStatuses = ['draft', 'sending', 'scheduled', 'sent'] as const
export const campaignRecipientStatuses = ['pending', 'sent', 'failed'] as const

export type CampaignStatus = (typeof campaignStatuses)[number]
export type CampaignRecipientStatus = (typeof campaignRecipientStatuses)[number]

export interface ApiError {
  error: string
  details?: string[]
}

export interface AuthUser {
  email: string
  id: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  name: string
  password: string
}

export interface AuthResponse {
  user: AuthUser
}

export interface HealthResponse {
  service: 'api'
  status: 'ok'
  timestamp: string
}
