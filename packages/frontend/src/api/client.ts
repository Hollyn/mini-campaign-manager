import { ApiError } from './types'

const API_BASE_PATH = '/api'

export class ApiRequestError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly details?: string[]
  ) {
    super(message)
    this.name = 'ApiRequestError'
  }
}

const parseErrorResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    const payload = (await response.json()) as Partial<ApiError>

    return new ApiRequestError(
      payload.error ?? 'Request failed',
      response.status,
      Array.isArray(payload.details) ? payload.details : undefined
    )
  }

  return new ApiRequestError('Request failed', response.status)
}

export const apiRequest = async <T>(path: string, init?: RequestInit) => {
  const headers = new Headers(init?.headers)

  if (!headers.has('Content-Type') && init?.body) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_PATH}${path}`, {
    ...init,
    credentials: 'include',
    headers
  })

  if (!response.ok) {
    throw await parseErrorResponse(response)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}
