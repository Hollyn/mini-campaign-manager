import bcrypt from 'bcrypt'

import { afterAll, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { Client } from 'pg'
import request from 'supertest'

import { createApp } from '../src/app'
import { sequelize } from '../src/config/database'
import { env } from '../src/config/env'
import { Recipient, User } from '../src/models'

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

const createAuthenticatedAgent = async () => {
  const agent = request.agent(app)

  await agent.post('/api/auth/login').send({
    email: 'demo@example.com',
    password: 'password123'
  })

  return agent
}

describe('recipient routes', () => {
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

  it('GET /api/recipients supports search, limit, and sorting', async () => {
    await createUser()
    await Recipient.bulkCreate([
      {
        createdAt: new Date(),
        email: 'zoe@example.com',
        name: 'Zoe Adams'
      },
      {
        createdAt: new Date(),
        email: 'alex@example.com',
        name: 'Alex Brown'
      },
      {
        createdAt: new Date(),
        email: 'mila@example.com',
        name: 'Mila Stone'
      }
    ])
    const agent = await createAuthenticatedAgent()

    const response = await agent.get('/api/recipients').query({
      limit: 2,
      page: 1,
      search: 'example.com',
      sortBy: 'email',
      sortOrder: 'asc'
    })

    expect(response.status).toBe(200)
    expect(response.body.pagination.limit).toBe(2)
    expect(response.body.pagination.total).toBe(3)
    expect(response.body.recipients).toHaveLength(2)
    expect(response.body.recipients[0].email).toBe('alex@example.com')
    expect(response.body.recipients[1].email).toBe('mila@example.com')
  })

  it('POST /api/recipients rejects cookie-auth requests from untrusted origins', async () => {
    await createUser()
    const agent = await createAuthenticatedAgent()

    const originalNodeEnv = env.NODE_ENV
    const originalAppOrigin = env.APP_ORIGIN

    ;(env as { NODE_ENV: string }).NODE_ENV = 'production'
    ;(env as { APP_ORIGIN?: string }).APP_ORIGIN = 'http://localhost:5173'

    try {
      const response = await agent
        .post('/api/recipients')
        .set('Origin', 'https://evil.example.com')
        .send({
          email: 'bad-origin@example.com',
          name: 'Bad Origin'
        })

      expect(response.status).toBe(403)
      expect(response.body.error).toBe('Invalid request origin')
    } finally {
      ;(env as { NODE_ENV: string }).NODE_ENV = originalNodeEnv
      ;(env as { APP_ORIGIN?: string }).APP_ORIGIN = originalAppOrigin
    }
  })

  it('POST /api/recipients allows cookie-auth requests from frontend origins in non-production', async () => {
    await createUser()
    const agent = await createAuthenticatedAgent()

    const response = await agent
      .post('/api/recipients')
      .set('Origin', 'https://foundation.example.test')
      .send({
        email: 'local-origin@example.com',
        name: 'Local Origin'
      })

    expect(response.status).toBe(201)
    expect(response.body.recipient.email).toBe('local-origin@example.com')
  })
})
