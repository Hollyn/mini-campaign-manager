import { Request } from 'express'

import { SESSION_COOKIE_NAME } from '../constants/auth'

const BEARER_PREFIX = 'Bearer '

export const getBearerTokenFromRequest = (request: Request) => {
  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader || !authorizationHeader.startsWith(BEARER_PREFIX)) {
    return null
  }

  const token = authorizationHeader.slice(BEARER_PREFIX.length).trim()

  return token.length > 0 ? token : null
}

export const getSessionCookieTokenFromRequest = (request: Request) => {
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

export const getSessionTokenFromRequest = (request: Request) =>
  getBearerTokenFromRequest(request) ?? getSessionCookieTokenFromRequest(request)
