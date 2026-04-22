import { NextFunction, Request, Response } from 'express'

import { loginUser, registerUser } from '../services/auth-service'
import { authResponseSchema, loginRequestSchema, registerRequestSchema } from '../validations/auth'
import { clearSessionCookie, setSessionCookie } from '../utils/cookies'

export const getCurrentUser = (request: Request, response: Response) => {
  response.status(200).json(
    authResponseSchema.parse({
      user: request.user
    })
  )
}

export const login = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const payload = loginRequestSchema.parse(request.body)
    const session = await loginUser(payload)

    setSessionCookie(response, session.token)

    response.status(200).json(
      authResponseSchema.parse({
        token: session.token,
        user: session.user
      })
    )
  } catch (error) {
    next(error)
  }
}

export const logout = (_request: Request, response: Response) => {
  clearSessionCookie(response)
  response.status(204).send()
}

export const register = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const payload = registerRequestSchema.parse(request.body)
    const session = await registerUser(payload)

    setSessionCookie(response, session.token)

    response.status(201).json(
      authResponseSchema.parse({
        token: session.token,
        user: session.user
      })
    )
  } catch (error) {
    next(error)
  }
}
