import { NextFunction, Request, Response } from 'express'
import { ZodError } from 'zod'

import { AppError } from '../utils/app-error'

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction): void => {
  next(new AppError(404, 'Route not found'))
}

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (error instanceof ZodError) {
    res.status(422).json({
      details: error.issues.map((issue) => {
        const path = issue.path.join('.')

        return path.length > 0 ? `${path}: ${issue.message}` : issue.message
      }),
      error: 'Validation failed'
    })

    return
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      details: error.details,
      error: error.message
    })

    return
  }

  res.status(500).json({
    error: 'Internal server error'
  })
}
