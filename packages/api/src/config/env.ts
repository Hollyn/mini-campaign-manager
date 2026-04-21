import path from 'node:path'

import { config as loadEnv } from 'dotenv'
import { z } from 'zod'

loadEnv({ path: path.resolve(__dirname, '../../../../.env') })

const envSchema = z.object({
  DATABASE_URL: z.string().default('postgresql://campaign:campaign@localhost:5432/campaign_manager'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  JWT_SECRET: z.string().default('change_me_in_production'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  SEED: z.string().optional()
})

export const env = envSchema.parse(process.env)
