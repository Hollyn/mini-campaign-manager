import path from 'node:path'

import { config as loadEnv } from 'dotenv'
import { z } from 'zod'

loadEnv({ path: path.resolve(__dirname, '../../../../.env') })

const parseOriginList = (value: unknown) => {
  if (typeof value !== 'string') {
    return []
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)
}

const envSchema = z.object({
  ALLOWED_ORIGINS: z.preprocess(parseOriginList, z.array(z.string().url()).default([])),
  APP_ORIGIN: z.string().url().optional(),
  CAMPAIGN_PROCESSOR_POLL_MS: z.coerce.number().int().positive().default(2000),
  DATABASE_URL: z.string().default('postgresql://campaign:campaign@localhost:5432/campaign_manager'),
  JWT_EXPIRES_IN: z.string().regex(/^(\d+)(ms|s|m|h|d)?$/).default('7d'),
  JWT_SECRET: z.string().default('change_me_in_production'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  SEED: z.string().optional(),
  TEST_DATABASE_URL: z.string().optional()
})

const parsedEnv = envSchema.parse(process.env)

if (
  parsedEnv.NODE_ENV === 'production' &&
  (parsedEnv.JWT_SECRET === 'change_me_in_production' || parsedEnv.JWT_SECRET.length < 32)
) {
  throw new Error('JWT_SECRET must be set to a strong value in production')
}

const deriveTestDatabaseUrl = (databaseUrl: string) => {
  const url = new URL(databaseUrl)
  const databaseName = url.pathname.replace(/^\//, '') || 'campaign_manager'

  url.pathname = `/${databaseName}_test`

  return url.toString()
}

export const env = {
  ...parsedEnv,
  DATABASE_URL:
    parsedEnv.NODE_ENV === 'test'
      ? parsedEnv.TEST_DATABASE_URL ?? deriveTestDatabaseUrl(parsedEnv.DATABASE_URL)
      : parsedEnv.DATABASE_URL
}
