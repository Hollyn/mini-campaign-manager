import { CookieOptions, Response } from 'express'

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

export const setSessionCookie = (response: Response, token: string) => {
  response.cookie(SESSION_COOKIE_NAME, token, buildSessionCookieOptions())
}
