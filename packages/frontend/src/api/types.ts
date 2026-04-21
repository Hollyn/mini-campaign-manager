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

export interface PaginationMeta {
  limit: number
  page: number
  total: number
  totalPages: number
}

export interface CampaignStats {
  failed: number
  open_rate: number
  opened: number
  send_rate: number
  sent: number
  total: number
}

export interface Campaign {
  body: string
  createdAt: string
  createdBy: string
  id: string
  name: string
  scheduledAt: string | null
  status: CampaignStatus
  subject: string
  updatedAt: string
}

export interface CampaignListItem extends Campaign {
  recipientCount: number
  stats: CampaignStats
}

export interface CampaignRecipientActivity {
  email: string
  name: string
  openedAt: string | null
  recipientId: string
  sentAt: string | null
  status: CampaignRecipientStatus
}

export interface CreateCampaignRequest {
  body: string
  name: string
  recipientIds?: string[]
  subject: string
}

export interface UpdateCampaignRequest {
  body?: string
  name?: string
  recipientIds?: string[]
  subject?: string
}

export interface ScheduleCampaignRequest {
  scheduled_at: string
}

export interface CampaignListQuery {
  page: number
  limit: number
  search?: string
  status?: CampaignStatus
}

export interface CampaignResponse {
  campaign: Campaign
  recipients: CampaignRecipientActivity[]
  stats: CampaignStats
}

export interface CampaignListResponse {
  campaigns: CampaignListItem[]
  pagination: PaginationMeta
}

export interface MessageResponse {
  message: string
}

export interface Recipient {
  createdAt: string
  email: string
  id: string
  name: string
}

export interface CreateRecipientRequest {
  email: string
  name: string
}

export interface UpdateRecipientRequest {
  email: string
  name: string
}

export interface RecipientResponse {
  recipient: Recipient
}

export interface RecipientListResponse {
  pagination: PaginationMeta
  recipients: Recipient[]
}
