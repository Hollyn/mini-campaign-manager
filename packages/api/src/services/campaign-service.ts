import { Op, Transaction } from 'sequelize'

import { sequelize } from '../config/database'
import { CAMPAIGN_MESSAGES, CAMPAIGN_SEND } from '../constants/campaigns'
import { Campaign, CampaignRecipient, Recipient } from '../models'
import { AppError } from '../utils/app-error'
import {
  CampaignListQuery,
  CampaignRecipientActivity,
  CampaignStats,
  CreateCampaignRequest,
  UpdateCampaignRequest
} from '../validations/campaign'
import { CampaignStatus } from '../validations/shared'

interface CampaignDetailResult {
  campaign: Campaign
  recipients: CampaignRecipientActivity[]
  stats: CampaignStats
}

const roundRate = (value: number) => Number(value.toFixed(2))

const sleep = (timeoutMs: number) => new Promise((resolve) => setTimeout(resolve, timeoutMs))

const toCampaignStats = (
  recipients: Array<Pick<CampaignRecipientActivity, 'openedAt' | 'status'>>
): CampaignStats => {
  const total = recipients.length
  const sent = recipients.filter((recipient) => recipient.status === 'sent').length
  const failed = recipients.filter((recipient) => recipient.status === 'failed').length
  const opened = recipients.filter((recipient) => recipient.openedAt !== null).length

  return {
    failed,
    open_rate: sent === 0 ? 0 : roundRate(opened / sent),
    opened,
    send_rate: total === 0 ? 0 : roundRate(sent / total),
    sent,
    total
  }
}

const toCampaignRecipientActivity = (campaignRecipient: CampaignRecipient & { recipient?: Recipient | null }): CampaignRecipientActivity => ({
  email: campaignRecipient.recipient?.email ?? '',
  name: campaignRecipient.recipient?.name ?? '',
  openedAt: campaignRecipient.openedAt ? campaignRecipient.openedAt.toISOString() : null,
  recipientId: campaignRecipient.recipientId,
  sentAt: campaignRecipient.sentAt ? campaignRecipient.sentAt.toISOString() : null,
  status: campaignRecipient.status
})

const toCampaignWhere = (userId: string, query?: CampaignListQuery) => {
  const where: {
    createdBy: string
    status?: CampaignStatus
    [Op.or]?: Array<Record<string, unknown>>
  } = {
    createdBy: userId
  }

  if (query?.status) {
    where.status = query.status
  }

  if (query?.search) {
    const value = `%${query.search}%`

    where[Op.or] = [
      {
        name: {
          [Op.iLike]: value
        }
      },
      {
        subject: {
          [Op.iLike]: value
        }
      }
    ]
  }

  return where
}

const findCampaignOrThrow = async (campaignId: string, userId: string, transaction?: Transaction) => {
  const campaign = await Campaign.findOne({
    transaction,
    where: {
      createdBy: userId,
      id: campaignId
    }
  })

  if (!campaign) {
    throw new AppError(404, CAMPAIGN_MESSAGES.notFound)
  }

  return campaign
}

const ensureDraftCampaign = (campaign: Campaign, message: string) => {
  if (campaign.status !== 'draft') {
    throw new AppError(409, message)
  }
}

const ensureRecipientsExist = async (recipientIds: string[], transaction?: Transaction) => {
  if (recipientIds.length === 0) {
    return []
  }

  const uniqueRecipientIds = [...new Set(recipientIds)]
  const recipients = await Recipient.findAll({
    transaction,
    where: {
      id: {
        [Op.in]: uniqueRecipientIds
      }
    }
  })

  if (recipients.length !== uniqueRecipientIds.length) {
    throw new AppError(404, CAMPAIGN_MESSAGES.recipientsMissing)
  }

  return uniqueRecipientIds
}

const syncCampaignRecipients = async (
  campaignId: string,
  recipientIds: string[],
  transaction: Transaction
) => {
  if (recipientIds.length === 0) {
    await CampaignRecipient.destroy({
      transaction,
      where: {
        campaignId
      }
    })

    return
  }

  await CampaignRecipient.destroy({
    transaction,
    where: {
      campaignId,
      recipientId: {
        [Op.notIn]: recipientIds
      }
    }
  })

  const existingRecipients = await CampaignRecipient.findAll({
    transaction,
    where: {
      campaignId,
      recipientId: {
        [Op.in]: recipientIds
      }
    }
  })

  const existingRecipientIds = new Set(existingRecipients.map((campaignRecipient) => campaignRecipient.recipientId))
  const nextRecipients = recipientIds
    .filter((recipientId) => !existingRecipientIds.has(recipientId))
    .map((recipientId) => ({
      campaignId,
      recipientId,
      status: 'pending' as const
    }))

  if (nextRecipients.length > 0) {
    await CampaignRecipient.bulkCreate(nextRecipients, { transaction })
  }
}

const getCampaignRecipients = async (campaignId: string) => {
  const campaignRecipients = await CampaignRecipient.findAll({
    include: [
      {
        attributes: ['email', 'id', 'name'],
        model: Recipient
      }
    ],
    order: [['recipientId', 'ASC']],
    where: {
      campaignId
    }
  })

  return campaignRecipients
    .map((campaignRecipient) => toCampaignRecipientActivity(campaignRecipient))
    .sort((left, right) => left.name.localeCompare(right.name))
}

const processCampaignSend = async (campaignId: string) => {
  try {
    const pendingRecipients = await CampaignRecipient.findAll({
      where: {
        campaignId,
        status: 'pending'
      }
    })

    for (const recipient of pendingRecipients) {
      const delay =
        CAMPAIGN_SEND.minDelayMs +
        Math.floor(Math.random() * (CAMPAIGN_SEND.maxDelayMs - CAMPAIGN_SEND.minDelayMs + 1))

      await sleep(delay)

      const isSent = Math.random() >= CAMPAIGN_SEND.failureThreshold

      await recipient.update({
        openedAt: null,
        sentAt: isSent ? new Date() : null,
        status: isSent ? 'sent' : 'failed'
      })
    }

    await Campaign.update(
      {
        status: 'sent'
      },
      {
        where: {
          id: campaignId
        }
      }
    )
  } catch (error) {
    console.error('Campaign send processing failed', error)
  }
}

export const listCampaigns = async (userId: string, query: CampaignListQuery) => {
  const offset = (query.page - 1) * query.limit
  const where = toCampaignWhere(userId, query)

  const { count, rows } = await Campaign.findAndCountAll({
    limit: query.limit,
    offset,
    order: [['createdAt', 'DESC']],
    where
  })

  const campaignIds = rows.map((campaign) => campaign.id)
  const campaignRecipients =
    campaignIds.length > 0
      ? await CampaignRecipient.findAll({
          attributes: ['campaignId', 'openedAt', 'recipientId', 'sentAt', 'status'],
          where: {
            campaignId: {
              [Op.in]: campaignIds
            }
          }
        })
      : []

  const recipientsByCampaignId = campaignRecipients.reduce<Record<string, CampaignRecipientActivity[]>>((accumulator, campaignRecipient) => {
    const activity: CampaignRecipientActivity = {
      email: '',
      name: '',
      openedAt: campaignRecipient.openedAt ? campaignRecipient.openedAt.toISOString() : null,
      recipientId: campaignRecipient.recipientId,
      sentAt: campaignRecipient.sentAt ? campaignRecipient.sentAt.toISOString() : null,
      status: campaignRecipient.status
    }

    accumulator[campaignRecipient.campaignId] ??= []
    accumulator[campaignRecipient.campaignId].push(activity)

    return accumulator
  }, {})

  return {
    campaigns: rows.map((campaign) => {
      const recipients = recipientsByCampaignId[campaign.id] ?? []

      return {
        campaign,
        recipientCount: recipients.length,
        stats: toCampaignStats(recipients)
      }
    }),
    pagination: {
      limit: query.limit,
      page: query.page,
      total: count,
      totalPages: count === 0 ? 0 : Math.ceil(count / query.limit)
    }
  }
}

export const getCampaignDetail = async (campaignId: string, userId: string): Promise<CampaignDetailResult> => {
  const campaign = await findCampaignOrThrow(campaignId, userId)
  const recipients = await getCampaignRecipients(campaign.id)

  return {
    campaign,
    recipients,
    stats: toCampaignStats(recipients)
  }
}

export const createCampaign = async (userId: string, input: CreateCampaignRequest): Promise<CampaignDetailResult> => {
  const recipientIds = await ensureRecipientsExist(input.recipientIds ?? [])

  const campaign = await sequelize.transaction(async (transaction) => {
    const nextCampaign = await Campaign.create(
      {
        body: input.body,
        createdAt: new Date(),
        createdBy: userId,
        name: input.name,
        scheduledAt: null,
        status: 'draft',
        subject: input.subject,
        updatedAt: new Date()
      },
      { transaction }
    )

    if (recipientIds.length > 0) {
      await CampaignRecipient.bulkCreate(
        recipientIds.map((recipientId) => ({
          campaignId: nextCampaign.id,
          recipientId,
          status: 'pending' as const
        })),
        { transaction }
      )
    }

    return nextCampaign
  })

  return getCampaignDetail(campaign.id, userId)
}

export const updateCampaign = async (
  campaignId: string,
  userId: string,
  input: UpdateCampaignRequest
): Promise<CampaignDetailResult> => {
  await sequelize.transaction(async (transaction) => {
    const campaign = await findCampaignOrThrow(campaignId, userId, transaction)

    ensureDraftCampaign(campaign, CAMPAIGN_MESSAGES.draftOnlyEdit)

    const recipientIds = input.recipientIds ? await ensureRecipientsExist(input.recipientIds, transaction) : null

    await campaign.update(
      {
        body: input.body ?? campaign.body,
        name: input.name ?? campaign.name,
        subject: input.subject ?? campaign.subject,
        updatedAt: new Date()
      },
      { transaction }
    )

    if (recipientIds) {
      await syncCampaignRecipients(campaign.id, recipientIds, transaction)
    }
  })

  return getCampaignDetail(campaignId, userId)
}

export const deleteCampaign = async (campaignId: string, userId: string) => {
  const campaign = await findCampaignOrThrow(campaignId, userId)

  ensureDraftCampaign(campaign, CAMPAIGN_MESSAGES.draftOnlyDelete)

  await campaign.destroy()
}

export const scheduleCampaign = async (campaignId: string, userId: string, scheduledAt: Date) => {
  const campaign = await findCampaignOrThrow(campaignId, userId)

  ensureDraftCampaign(campaign, CAMPAIGN_MESSAGES.draftOnlySchedule)

  if (scheduledAt.getTime() <= Date.now()) {
    throw new AppError(422, CAMPAIGN_MESSAGES.scheduleMustBeFuture)
  }

  await campaign.update({
    scheduledAt,
    status: 'scheduled',
    updatedAt: new Date()
  })

  return getCampaignDetail(campaignId, userId)
}

export const sendCampaign = async (campaignId: string, userId: string) => {
  const campaign = await findCampaignOrThrow(campaignId, userId)

  if (campaign.status === 'sending' || campaign.status === 'sent') {
    throw new AppError(409, CAMPAIGN_MESSAGES.alreadySendingOrSent)
  }

  await campaign.update({
    scheduledAt: null,
    status: 'sending',
    updatedAt: new Date()
  })

  setImmediate(() => {
    void processCampaignSend(campaign.id)
  })

  return {
    message: CAMPAIGN_MESSAGES.sendStarted
  }
}
