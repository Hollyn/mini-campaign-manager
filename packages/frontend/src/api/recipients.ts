import {
  CreateRecipientRequest,
  RecipientListQuery,
  RecipientListResponse,
  RecipientResponse,
  UpdateRecipientRequest
} from './types'
import { apiRequest } from './client'

const toRecipientQuery = (query: RecipientListQuery) => {
  const params = new URLSearchParams({
    limit: String(query.limit),
    page: String(query.page),
    sortBy: query.sortBy,
    sortOrder: query.sortOrder
  })

  if (query.search && query.search.trim().length > 0) {
    params.set('search', query.search.trim())
  }

  return params.toString()
}

export const getRecipients = (query: RecipientListQuery) =>
  apiRequest<RecipientListResponse>(`/recipients?${toRecipientQuery(query)}`)

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
