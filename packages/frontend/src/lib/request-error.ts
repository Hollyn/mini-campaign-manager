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

export const getRequestFieldErrors = <T extends string>(error: unknown, fields: readonly T[]) => {
  const fieldErrors: Partial<Record<T, string>> = {}

  if (!(error instanceof ApiRequestError) || !error.details || error.details.length === 0) {
    return fieldErrors
  }

  const fieldSet = new Set(fields)

  error.details.forEach((detail) => {
    const separatorIndex = detail.indexOf(': ')

    if (separatorIndex === -1) {
      return
    }

    const field = detail.slice(0, separatorIndex) as T
    const message = detail.slice(separatorIndex + 2)

    if (!fieldSet.has(field) || message.length === 0) {
      return
    }

    fieldErrors[field] = message
  })

  return fieldErrors
}
