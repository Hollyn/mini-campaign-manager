import { NextFunction, Request, Response } from 'express'

import { AUTH_MESSAGES } from '../constants/auth'
import { getAuthUserBySessionToken } from '../services/auth-service'
import { AppError } from '../utils/app-error'
import { getSessionTokenFromRequest } from '../utils/session-token'

export const requireAuth = async (request: Request, _response: Response, next: NextFunction) => {
  try {
    const token = getSessionTokenFromRequest(request)

    if (!token) {
      throw new AppError(401, AUTH_MESSAGES.sessionInvalid)
    }

    request.user = await getAuthUserBySessionToken(token)

    next()
  } catch (error) {
    next(error)
  }
}
