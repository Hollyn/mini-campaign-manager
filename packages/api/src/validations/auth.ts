import { z } from 'zod'

import { AUTH_NUMBERS } from '../constants/auth'

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email is required')
  .email('Email must be a valid email address')
  .transform((value) => value.toLowerCase())

const nameSchema = z
  .string()
  .trim()
  .min(AUTH_NUMBERS.minNameLength, `Name must be at least ${AUTH_NUMBERS.minNameLength} characters`)
  .max(AUTH_NUMBERS.maxNameLength, `Name must be at most ${AUTH_NUMBERS.maxNameLength} characters`)

const passwordSchema = z
  .string()
  .min(AUTH_NUMBERS.minPasswordLength, `Password must be at least ${AUTH_NUMBERS.minPasswordLength} characters`)
  .max(AUTH_NUMBERS.maxPasswordLength, `Password must be at most ${AUTH_NUMBERS.maxPasswordLength} characters`)

export const authUserSchema = z.object({
  email: z.string().email(),
  id: z.string().uuid(),
  name: z.string().min(1)
})

export const registerRequestSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema
})

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

export const authResponseSchema = z.object({
  token: z.string().min(1).optional(),
  user: authUserSchema
})

export type AuthResponse = z.infer<typeof authResponseSchema>
export type AuthUser = z.infer<typeof authUserSchema>
export type LoginRequest = z.infer<typeof loginRequestSchema>
export type RegisterRequest = z.infer<typeof registerRequestSchema>
