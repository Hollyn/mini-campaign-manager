import { z } from 'zod'

import { RECIPIENT_PAGINATION } from '../constants/recipients'

const recipientEmailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Email must be a valid email address')
  .transform((value) => value.toLowerCase())

const recipientNameSchema = z
  .string()
  .trim()
  .min(1, 'Name is required')
  .max(255, 'Name must be at most 255 characters')

const recipientIdSchema = z.object({
  id: z.string().uuid('Recipient id must be a valid UUID')
})

const sortOrderSchema = z.enum(['asc', 'desc'])
const recipientListSortBySchema = z.enum(['email', 'name'])

const paginationSchema = z.object({
  limit: z.coerce.number().int().min(1).max(RECIPIENT_PAGINATION.maxLimit).default(RECIPIENT_PAGINATION.defaultLimit),
  page: z.coerce.number().int().min(RECIPIENT_PAGINATION.minPage).default(RECIPIENT_PAGINATION.minPage),
  search: z.string().trim().max(255, 'Search must be at most 255 characters').optional().default(''),
  sortBy: recipientListSortBySchema.default('name'),
  sortOrder: sortOrderSchema.default('asc')
})

export const recipientSchema = z.object({
  createdAt: z.string().datetime(),
  email: z.string().email(),
  id: z.string().uuid(),
  name: z.string().min(1)
})

export const createRecipientRequestSchema = z.object({
  email: recipientEmailSchema,
  name: recipientNameSchema
})

export const updateRecipientRequestSchema = createRecipientRequestSchema

export const recipientListQuerySchema = paginationSchema

export const recipientParamsSchema = recipientIdSchema

export const recipientResponseSchema = z.object({
  recipient: recipientSchema
})

export const recipientListResponseSchema = z.object({
  pagination: z.object({
    limit: z.number().int().min(1),
    page: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0)
  }),
  recipients: z.array(recipientSchema)
})

export type CreateRecipientRequest = z.infer<typeof createRecipientRequestSchema>
export type Recipient = z.infer<typeof recipientSchema>
export type RecipientListQuery = z.infer<typeof recipientListQuerySchema>
export type RecipientListResponse = z.infer<typeof recipientListResponseSchema>
export type RecipientListSortBy = z.infer<typeof recipientListSortBySchema>
export type RecipientParams = z.infer<typeof recipientParamsSchema>
export type RecipientResponse = z.infer<typeof recipientResponseSchema>
export type SortOrder = z.infer<typeof sortOrderSchema>
export type UpdateRecipientRequest = z.infer<typeof updateRecipientRequestSchema>
