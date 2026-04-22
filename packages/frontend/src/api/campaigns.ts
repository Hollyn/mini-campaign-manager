import {
  CampaignListQuery,
  CampaignListResponse,
  CampaignResponse,
  CreateCampaignRequest,
  MessageResponse,
  ScheduleCampaignRequest,
  UpdateCampaignRequest
} from './types'
import { apiRequest } from './client'

const toCampaignListQuery = (query: CampaignListQuery) => {
  const params = new URLSearchParams({
    limit: String(query.limit),
    page: String(query.page),
    sortBy: query.sortBy,
    sortOrder: query.sortOrder
  })

  if (query.search && query.search.trim().length > 0) {
    params.set('search', query.search.trim())
  }

  if (query.status) {
    params.set('status', query.status)
  }

  return params.toString()
}

export const getCampaigns = (query: CampaignListQuery) =>
  apiRequest<CampaignListResponse>(`/campaigns?${toCampaignListQuery(query)}`)

export const getCampaign = (id: string) => apiRequest<CampaignResponse>(`/campaigns/${id}`)

export const createCampaign = (payload: CreateCampaignRequest) =>
  apiRequest<CampaignResponse>('/campaigns', {
    body: JSON.stringify(payload),
    method: 'POST'
  })

export const updateCampaign = (id: string, payload: UpdateCampaignRequest) =>
  apiRequest<CampaignResponse>(`/campaigns/${id}`, {
    body: JSON.stringify(payload),
    method: 'PATCH'
  })

export const deleteCampaign = (id: string) =>
  apiRequest<void>(`/campaigns/${id}`, {
    method: 'DELETE'
  })

export const scheduleCampaign = (id: string, payload: ScheduleCampaignRequest) =>
  apiRequest<CampaignResponse>(`/campaigns/${id}/schedule`, {
    body: JSON.stringify(payload),
    method: 'POST'
  })

export const sendCampaign = (id: string) =>
  apiRequest<MessageResponse>(`/campaigns/${id}/send`, {
    method: 'POST'
  })
