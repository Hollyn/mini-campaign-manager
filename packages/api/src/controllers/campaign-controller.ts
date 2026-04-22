import { NextFunction, Request, Response } from 'express'

import {
  createCampaign,
  deleteCampaign,
  getCampaignDetail,
  listCampaigns,
  scheduleCampaign,
  sendCampaign,
  updateCampaign
} from '../services/campaign-service'
import {
  campaignListQuerySchema,
  campaignListResponseSchema,
  campaignParamsSchema,
  campaignResponseSchema,
  campaignSchema,
  campaignStatsSchema,
  createCampaignRequestSchema,
  messageResponseSchema,
  scheduleCampaignRequestSchema,
  updateCampaignRequestSchema
} from '../validations/campaign'

const toCampaignDto = (campaign: {
  body: string
  createdAt: Date
  createdBy: string
  id: string
  name: string
  scheduledAt: Date | null
  status: string
  subject: string
  updatedAt: Date
}) =>
  campaignSchema.parse({
    body: campaign.body,
    createdAt: campaign.createdAt.toISOString(),
    createdBy: campaign.createdBy,
    id: campaign.id,
    name: campaign.name,
    scheduledAt: campaign.scheduledAt ? campaign.scheduledAt.toISOString() : null,
    status: campaign.status,
    subject: campaign.subject,
    updatedAt: campaign.updatedAt.toISOString()
  })

export const getCampaigns = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const query = campaignListQuerySchema.parse(request.query)
    const result = await listCampaigns(request.user!.id, query)

    response.status(200).json(
      campaignListResponseSchema.parse({
        campaigns: result.campaigns.map((entry) => ({
          ...toCampaignDto(entry.campaign),
          recipientCount: entry.recipientCount,
          stats: campaignStatsSchema.parse(entry.stats)
        })),
        pagination: result.pagination
      })
    )
  } catch (error) {
    next(error)
  }
}

export const getCampaign = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = campaignParamsSchema.parse(request.params)
    const result = await getCampaignDetail(params.id, request.user!.id)

    response.status(200).json(
      campaignResponseSchema.parse({
        campaign: toCampaignDto(result.campaign),
        recipients: result.recipients,
        stats: result.stats
      })
    )
  } catch (error) {
    next(error)
  }
}

export const postCampaign = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const payload = createCampaignRequestSchema.parse(request.body)
    const result = await createCampaign(request.user!.id, payload)

    response.status(201).json(
      campaignResponseSchema.parse({
        campaign: toCampaignDto(result.campaign),
        recipients: result.recipients,
        stats: result.stats
      })
    )
  } catch (error) {
    next(error)
  }
}

export const patchCampaign = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = campaignParamsSchema.parse(request.params)
    const payload = updateCampaignRequestSchema.parse(request.body)
    const result = await updateCampaign(params.id, request.user!.id, payload)

    response.status(200).json(
      campaignResponseSchema.parse({
        campaign: toCampaignDto(result.campaign),
        recipients: result.recipients,
        stats: result.stats
      })
    )
  } catch (error) {
    next(error)
  }
}

export const removeCampaign = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = campaignParamsSchema.parse(request.params)

    await deleteCampaign(params.id, request.user!.id)
    response.status(204).send()
  } catch (error) {
    next(error)
  }
}

export const postScheduleCampaign = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = campaignParamsSchema.parse(request.params)
    const payload = scheduleCampaignRequestSchema.parse(request.body)
    const result = await scheduleCampaign(params.id, request.user!.id, new Date(payload.scheduled_at))

    response.status(200).json(
      campaignResponseSchema.parse({
        campaign: toCampaignDto(result.campaign),
        recipients: result.recipients,
        stats: result.stats
      })
    )
  } catch (error) {
    next(error)
  }
}

export const postSendCampaign = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = campaignParamsSchema.parse(request.params)
    const result = await sendCampaign(params.id, request.user!.id)

    response.status(202).json(messageResponseSchema.parse(result))
  } catch (error) {
    next(error)
  }
}
