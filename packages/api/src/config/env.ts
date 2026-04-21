import path from 'node:path'

import { config as loadEnv } from 'dotenv'
import { z } from 'zod'

loadEnv({ path: path.resolve(__dirname, '../../../../.env') })

const envSchema = z.object({
  DATABASE_URL: z.string().default('postgresql://campaign:campaign@localhost:5432/campaign_manager'),
  JWT_EXPIRES_IN: z.string().regex(/^(\d+)(ms|s|m|h|d)?$/).default('7d'),
  JWT_SECRET: z.string().default('change_me_in_production'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  SEED: z.string().optional(),
  TEST_DATABASE_URL: z.string().optional()
})

const parsedEnv = envSchema.parse(process.env)

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
