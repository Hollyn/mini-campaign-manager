import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

import { env } from '../config/env'
import { AUTH_MESSAGES } from '../constants/auth'
import { AppError } from './app-error'

export interface SessionTokenPayload extends JwtPayload {
  email: string
  name: string
  sub: string
}

interface SessionTokenInput {
  email: string
  name: string
  sub: string
}

const durationUnits = {
  d: 24 * 60 * 60 * 1000,
  h: 60 * 60 * 1000,
  m: 60 * 1000,
  ms: 1,
  s: 1000
} as const

export const getJwtMaxAgeMs = (expiresIn: string) => {
  const match = expiresIn.trim().match(/^(\d+)(ms|s|m|h|d)?$/)

  if (!match) {
    throw new Error(`Invalid JWT_EXPIRES_IN value: ${expiresIn}`)
  }

  const [, value, rawUnit = 's'] = match
  const unit = rawUnit as keyof typeof durationUnits

  return Number(value) * durationUnits[unit]
}

export const signSessionToken = (payload: SessionTokenInput) =>
  jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn']
  })

export const verifySessionToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET)

    if (typeof decoded === 'string') {
      throw new AppError(401, AUTH_MESSAGES.sessionInvalid)
    }

    const { email, name, sub } = decoded as SessionTokenPayload

    if (typeof email !== 'string' || typeof name !== 'string' || typeof sub !== 'string') {
      throw new AppError(401, AUTH_MESSAGES.sessionInvalid)
    }

    return {
      ...decoded,
      email,
      name,
      sub
    } as SessionTokenPayload
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    throw new AppError(401, AUTH_MESSAGES.sessionInvalid)
  }
}
