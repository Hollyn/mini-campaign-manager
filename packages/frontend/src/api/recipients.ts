import {
  CreateRecipientRequest,
  RecipientListResponse,
  RecipientResponse,
  UpdateRecipientRequest
} from './types'
import { apiRequest } from './client'

const toRecipientQuery = (page: number, limit: number, search?: string) => {
  const params = new URLSearchParams({
    limit: String(limit),
    page: String(page)
  })

  if (search && search.trim().length > 0) {
    params.set('search', search.trim())
  }

  return params.toString()
}

export const getRecipients = (page: number, limit: number, search?: string) =>
  apiRequest<RecipientListResponse>(`/recipients?${toRecipientQuery(page, limit, search)}`)

export const createRecipient = (payload: CreateRecipientRequest) =>
  apiRequest<RecipientResponse>('/recipients', {
    body: JSON.stringify(payload),
    method: 'POST'
  })

export const updateRecipient = (id: string, payload: UpdateRecipientRequest) =>
  apiRequest<RecipientResponse>(`/recipients/${id}`, {
    body: JSON.stringify(payload),
    method: 'PATCH'
  })

export const deleteRecipient = (id: string) =>
  apiRequest<void>(`/recipients/${id}`, {
    method: 'DELETE'
  })
