import { z } from 'zod'

import { CAMPAIGN_PAGINATION } from '../constants/campaigns'
import { campaignRecipientStatusSchema, campaignStatusSchema } from './shared'

const campaignTextSchema = z.string().trim().min(1, 'Field is required')
const sortOrderSchema = z.enum(['asc', 'desc'])
const campaignListSortBySchema = z.enum(['createdAt', 'name', 'recipientCount', 'status', 'subject'])

const campaignIdSchema = z.object({
  id: z.string().uuid('Campaign id must be a valid UUID')
})

const recipientIdsSchema = z.array(z.string().uuid('Recipient id must be a valid UUID')).max(100).default([])

export const campaignStatsSchema = z.object({
  failed: z.number().int().min(0),
  open_rate: z.number().min(0).max(1),
  opened: z.number().int().min(0),
  send_rate: z.number().min(0).max(1),
  sent: z.number().int().min(0),
  total: z.number().int().min(0)
})

export const campaignSchema = z.object({
  body: z.string().min(1),
  createdAt: z.string().datetime(),
  createdBy: z.string().uuid(),
  id: z.string().uuid(),
  name: z.string().min(1),
  scheduledAt: z.string().datetime().nullable(),
  status: campaignStatusSchema,
  subject: z.string().min(1),
  updatedAt: z.string().datetime()
})

export const campaignListItemSchema = campaignSchema.extend({
  recipientCount: z.number().int().min(0),
  stats: campaignStatsSchema
})

export const campaignRecipientActivitySchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  openedAt: z.string().datetime().nullable(),
  recipientId: z.string().uuid(),
  sentAt: z.string().datetime().nullable(),
  status: campaignRecipientStatusSchema
})

export const createCampaignRequestSchema = z.object({
  body: campaignTextSchema,
  name: campaignTextSchema.max(255, 'Campaign name must be at most 255 characters'),
  recipientIds: recipientIdsSchema.optional(),
  subject: campaignTextSchema.max(500, 'Campaign subject must be at most 500 characters')
})

export const updateCampaignRequestSchema = z
  .object({
    body: campaignTextSchema.optional(),
    name: campaignTextSchema.max(255, 'Campaign name must be at most 255 characters').optional(),
    recipientIds: recipientIdsSchema.optional(),
    subject: campaignTextSchema.max(500, 'Campaign subject must be at most 500 characters').optional()
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required'
  })

export const campaignListQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(CAMPAIGN_PAGINATION.maxLimit).default(CAMPAIGN_PAGINATION.defaultLimit),
  page: z.coerce.number().int().min(CAMPAIGN_PAGINATION.minPage).default(CAMPAIGN_PAGINATION.minPage),
  search: z.string().trim().max(255, 'Search must be at most 255 characters').optional().default(''),
  sortBy: campaignListSortBySchema.default('createdAt'),
  sortOrder: sortOrderSchema.default('desc'),
  status: campaignStatusSchema.optional()
})

export const scheduleCampaignRequestSchema = z.object({
  scheduled_at: z.string().datetime('Scheduled time must be a valid ISO timestamp')
})

export const campaignParamsSchema = campaignIdSchema

export const campaignResponseSchema = z.object({
  campaign: campaignSchema,
  recipients: z.array(campaignRecipientActivitySchema),
  stats: campaignStatsSchema
})

export const campaignListResponseSchema = z.object({
  campaigns: z.array(campaignListItemSchema),
  pagination: z.object({
    limit: z.number().int().min(1),
    page: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0)
  })
})

export const messageResponseSchema = z.object({
  message: z.string().min(1)
})

export type Campaign = z.infer<typeof campaignSchema>
export type CampaignListItem = z.infer<typeof campaignListItemSchema>
export type CampaignListQuery = z.infer<typeof campaignListQuerySchema>
export type CampaignListResponse = z.infer<typeof campaignListResponseSchema>
export type CampaignListSortBy = z.infer<typeof campaignListSortBySchema>
export type CampaignParams = z.infer<typeof campaignParamsSchema>
export type CampaignRecipientActivity = z.infer<typeof campaignRecipientActivitySchema>
export type CampaignResponse = z.infer<typeof campaignResponseSchema>
export type CampaignStats = z.infer<typeof campaignStatsSchema>
export type CreateCampaignRequest = z.infer<typeof createCampaignRequestSchema>
export type MessageResponse = z.infer<typeof messageResponseSchema>
export type ScheduleCampaignRequest = z.infer<typeof scheduleCampaignRequestSchema>
export type SortOrder = z.infer<typeof sortOrderSchema>
export type UpdateCampaignRequest = z.infer<typeof updateCampaignRequestSchema>
