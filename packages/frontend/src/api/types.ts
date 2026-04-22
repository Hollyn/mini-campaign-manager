export const campaignStatuses = ['draft', 'sending', 'scheduled', 'sent'] as const
export const campaignRecipientStatuses = ['pending', 'sent', 'failed'] as const
export const sortDirections = ['asc', 'desc'] as const
export const campaignListSortFields = ['createdAt', 'name', 'recipientCount', 'status', 'subject'] as const
export const campaignRecipientListSortFields = ['email', 'name', 'openedAt', 'sentAt', 'status'] as const
export const recipientListSortFields = ['email', 'name'] as const

export type CampaignStatus = (typeof campaignStatuses)[number]
export type CampaignRecipientStatus = (typeof campaignRecipientStatuses)[number]
export type SortDirection = (typeof sortDirections)[number]
export type CampaignListSortBy = (typeof campaignListSortFields)[number]
export type CampaignRecipientListSortBy = (typeof campaignRecipientListSortFields)[number]
export type RecipientListSortBy = (typeof recipientListSortFields)[number]

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

export interface AuthSessionResponse extends AuthResponse {
  token: string
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
  limit: number
  page: number
  search?: string
  sortBy: CampaignListSortBy
  sortOrder: SortDirection
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

export interface RecipientListQuery {
  limit: number
  page: number
  search?: string
  sortBy: RecipientListSortBy
  sortOrder: SortDirection
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
