import { NextFunction, Request, Response } from 'express'

import { env } from '../config/env'
import { SECURITY_MESSAGES, UNSAFE_HTTP_METHODS } from '../constants/security'
import { AppError } from '../utils/app-error'
import {
  getBearerTokenFromRequest,
  getSessionCookieTokenFromRequest
} from '../utils/session-token'

const toHeaderValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

const getRequestProtocol = (request: Request) => {
  const forwardedProtocol = toHeaderValue(request.headers['x-forwarded-proto'])

  if (forwardedProtocol) {
    return forwardedProtocol.split(',')[0].trim()
  }

  return request.secure ? 'https' : 'http'
}

const toOrigin = (value: string | undefined) => {
  if (!value) {
    return null
  }

  try {
    return new URL(value).origin
  } catch {
    return null
  }
}

const isTrustedNonProductionRequest = () => env.NODE_ENV !== 'production'

const getAllowedOrigins = (request: Request) => {
  const origins = new Set<string>()
  const host = request.get('host')

  if (host) {
    origins.add(`${getRequestProtocol(request)}://${host}`)
  }

  if (env.APP_ORIGIN) {
    origins.add(env.APP_ORIGIN)
  }

  env.ALLOWED_ORIGINS.forEach((origin) => {
    origins.add(origin)
  })

  return origins
}

const isUnsafeMethod = (method: string) =>
  UNSAFE_HTTP_METHODS.includes(method as (typeof UNSAFE_HTTP_METHODS)[number])

export const requireTrustedOrigin = (request: Request, _response: Response, next: NextFunction) => {
  try {
    if (!isUnsafeMethod(request.method)) {
      next()

      return
    }

    if (getBearerTokenFromRequest(request)) {
      next()

      return
    }

    if (!getSessionCookieTokenFromRequest(request)) {
      next()

      return
    }

    const requestOrigin =
      toOrigin(toHeaderValue(request.headers.origin)) ?? toOrigin(toHeaderValue(request.headers.referer))

    if (!requestOrigin) {
      next()

      return
    }

    if (isTrustedNonProductionRequest()) {
      next()

      return
    }

    if (!getAllowedOrigins(request).has(requestOrigin)) {
      throw new AppError(403, SECURITY_MESSAGES.invalidOrigin)
    }

    next()
  } catch (error) {
    next(error)
  }
}
