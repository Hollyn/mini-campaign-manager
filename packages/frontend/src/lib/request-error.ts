import { ApiRequestError } from '../api/client'

export const getRequestErrorMessage = (error: unknown, fallback: string) => {
  if (!(error instanceof ApiRequestError)) {
    return fallback
  }

  if (!error.details || error.details.length === 0) {
    return error.message
  }

  return `${error.message}: ${error.details.join(', ')}`
}
