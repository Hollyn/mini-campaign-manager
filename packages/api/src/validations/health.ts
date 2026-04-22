import { z } from 'zod'

export const healthResponseSchema = z.object({
  service: z.literal('api'),
  status: z.literal('ok'),
  timestamp: z.string().min(1)
})

export type HealthResponse = z.infer<typeof healthResponseSchema>
