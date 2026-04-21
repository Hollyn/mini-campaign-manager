import { CookieOptions, Request, Response } from 'express'

import { env } from '../config/env'
import { SESSION_COOKIE_NAME } from '../constants/auth'
import { getJwtMaxAgeMs } from './jwt'

const buildSessionCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  maxAge: getJwtMaxAgeMs(env.JWT_EXPIRES_IN),
  path: '/',
  sameSite: 'lax',
  secure: env.NODE_ENV === 'production'
})

export const clearSessionCookie = (response: Response) => {
  response.clearCookie(SESSION_COOKIE_NAME, buildSessionCookieOptions())
}

export const getSessionTokenFromRequest = (request: Request) => {
  const cookieHeader = request.headers.cookie

  if (!cookieHeader) {
    return null
  }

  const cookies = cookieHeader.split(';').reduce<Record<string, string>>((accumulator, cookiePair) => {
    const separatorIndex = cookiePair.indexOf('=')

    if (separatorIndex === -1) {
      return accumulator
    }

    const key = cookiePair.slice(0, separatorIndex).trim()
    const value = cookiePair.slice(separatorIndex + 1).trim()

    accumulator[key] = decodeURIComponent(value)

    return accumulator
  }, {})

  return cookies[SESSION_COOKIE_NAME] ?? null
}

export const setSessionCookie = (response: Response, token: string) => {
  response.cookie(SESSION_COOKIE_NAME, token, buildSessionCookieOptions())
}
