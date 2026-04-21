import type { AuthUser } from '../validations/auth'

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

export {}
