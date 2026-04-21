import bcrypt from 'bcrypt'

import { afterAll, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { Client } from 'pg'
import request from 'supertest'

import { createApp } from '../src/app'
import { sequelize } from '../src/config/database'
import { env } from '../src/config/env'
import { Campaign, CampaignRecipient, Recipient, User } from '../src/models'

const app = createApp()

const ensureTestDatabase = async () => {
  const connectionUrl = new URL(env.DATABASE_URL)
  const databaseName = connectionUrl.pathname.slice(1)
  const adminClient = new Client({
    database: 'postgres',
    host: connectionUrl.hostname,
    password: connectionUrl.password,
    port: Number(connectionUrl.port || 5432),
    user: connectionUrl.username
  })

  await adminClient.connect()

  const result = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [databaseName])

  if (result.rowCount === 0) {
    await adminClient.query(`CREATE DATABASE "${databaseName.replace(/"/g, '')}"`)
  }

  await adminClient.end()
}

const truncateAll = async () => {
  await sequelize.query('TRUNCATE TABLE campaign_recipients, campaigns, recipients, users RESTART IDENTITY CASCADE;')
}

const createUser = async () =>
  User.create({
    createdAt: new Date(),
    email: 'demo@example.com',
    name: 'Demo User',
    password: await bcrypt.hash('password123', 10)
  })

const createRecipients = async () =>
  Promise.all(
    ['maya@example.com', 'jonah@example.com', 'elena@example.com'].map((email, index) =>
      Recipient.create({
        createdAt: new Date(),
        email,
        name: `Recipient ${index + 1}`
      })
    )
  )

const createAuthenticatedAgent = async () => {
  const agent = request.agent(app)

  await agent.post('/api/auth/login').send({
    email: 'demo@example.com',
    password: 'password123'
  })

  return agent
}

const waitForCampaignToBeSent = async (campaignId: string) => {
  const startTime = Date.now()

  while (Date.now() - startTime < 5000) {
    const campaign = await Campaign.findByPk(campaignId)

    if (campaign?.status === 'sent') {
      return
    }

    await new Promise((resolve) => setTimeout(resolve, 50))
  }

  throw new Error('Timed out waiting for campaign to finish sending')
}

const roundRate = (value: number) => Number(value.toFixed(2))

describe('campaign routes', () => {
  beforeAll(async () => {
    await ensureTestDatabase()
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
  })

  beforeEach(async () => {
    await truncateAll()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('PATCH /api/campaigns/:id on a non-draft campaign returns 409', async () => {
    const user = await createUser()
    const campaign = await Campaign.create({
      body: 'Body',
      createdAt: new Date(),
      createdBy: user.id,
      name: 'Scheduled campaign',
      scheduledAt: new Date(Date.now() + 60_000),
      status: 'scheduled',
      subject: 'Subject',
      updatedAt: new Date()
    })
    const agent = await createAuthenticatedAgent()

    const response = await agent.patch(`/api/campaigns/${campaign.id}`).send({
      name: 'Updated name'
    })

    expect(response.status).toBe(409)
    expect(response.body.error).toBe('Only draft campaigns can be edited')
  })

  it('POST /api/campaigns/:id/schedule with a past scheduled_at returns 422', async () => {
    const user = await createUser()
    const campaign = await Campaign.create({
      body: 'Body',
      createdAt: new Date(),
      createdBy: user.id,
      name: 'Draft campaign',
      scheduledAt: null,
      status: 'draft',
      subject: 'Subject',
      updatedAt: new Date()
    })
    const agent = await createAuthenticatedAgent()

    const response = await agent.post(`/api/campaigns/${campaign.id}/schedule`).send({
      scheduled_at: new Date(Date.now() - 60_000).toISOString()
    })

    expect(response.status).toBe(422)
    expect(response.body.error).toBe('Scheduled time must be in the future')
  })

  it('POST /api/campaigns/:id/send processes all pending recipients and marks campaign sent', async () => {
    const user = await createUser()
    const recipients = await createRecipients()
    const campaign = await Campaign.create({
      body: 'Body',
      createdAt: new Date(),
      createdBy: user.id,
      name: 'Draft campaign',
      scheduledAt: null,
      status: 'draft',
      subject: 'Subject',
      updatedAt: new Date()
    })

    await CampaignRecipient.bulkCreate(
      recipients.map((recipient) => ({
        campaignId: campaign.id,
        recipientId: recipient.id,
        status: 'pending' as const
      }))
    )

    const agent = await createAuthenticatedAgent()
    const response = await agent.post(`/api/campaigns/${campaign.id}/send`).send()

    expect(response.status).toBe(202)
    expect(response.body.message).toBe('Send started')

    await waitForCampaignToBeSent(campaign.id)

    const sentCampaign = await Campaign.findByPk(campaign.id)
    const campaignRecipients = await CampaignRecipient.findAll({
      where: {
        campaignId: campaign.id
      }
    })
    const detailResponse = await agent.get(`/api/campaigns/${campaign.id}`)
    const openedCount = campaignRecipients.filter((recipient) => recipient.openedAt !== null).length
    const sentCount = campaignRecipients.filter((recipient) => recipient.status === 'sent').length
    const expectedOpenRate = sentCount === 0 ? 0 : roundRate(openedCount / sentCount)

    expect(sentCampaign?.status).toBe('sent')
    expect(campaignRecipients).toHaveLength(3)
    expect(campaignRecipients.every((recipient) => recipient.status === 'sent' || recipient.status === 'failed')).toBe(true)
    expect(campaignRecipients.every((recipient) => recipient.status !== 'pending')).toBe(true)
    expect(campaignRecipients.every((recipient) => recipient.status === 'sent' || recipient.openedAt === null)).toBe(true)
    expect(detailResponse.status).toBe(200)
    expect(detailResponse.body.stats.opened).toBe(openedCount)
    expect(detailResponse.body.stats.sent).toBe(sentCount)
    expect(detailResponse.body.stats.open_rate).toBe(expectedOpenRate)
  })
})
