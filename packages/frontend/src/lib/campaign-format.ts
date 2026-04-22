import { Campaign, CampaignStats, CampaignStatus } from '../api/types'
import { CAMPAIGN_COPY } from '../constants/campaigns'

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

const dateTimeFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  month: 'short',
  year: 'numeric'
})

const numberFormatter = new Intl.NumberFormat('en-US')

export const formatCampaignDate = (value: string | null) => {
  if (!value) {
    return '-'
  }

  return dateFormatter.format(new Date(value))
}

export const formatCampaignDateTime = (value: string | null) => {
  if (!value) {
    return '-'
  }

  return dateTimeFormatter.format(new Date(value))
}

export const formatCampaignRate = (value: number) => `${Math.round(value * 100)}%`

export const formatCampaignCount = (value: number) => numberFormatter.format(value)

export const getCampaignStatusLabel = (status: CampaignStatus) => CAMPAIGN_COPY.statusLabels[status]

export const getCampaignDetailMetaItems = (campaign: Campaign) => [
  { label: CAMPAIGN_COPY.detail.fields.created, value: formatCampaignDate(campaign.createdAt) },
  { label: CAMPAIGN_COPY.detail.fields.updated, value: formatCampaignDate(campaign.updatedAt) },
  { label: CAMPAIGN_COPY.detail.fields.scheduled, value: formatCampaignDateTime(campaign.scheduledAt) }
]

export const getCampaignStatCards = (stats: CampaignStats) => [
  { label: CAMPAIGN_COPY.stats.total, value: formatCampaignCount(stats.total) },
  { label: CAMPAIGN_COPY.stats.received, value: formatCampaignCount(Math.min(stats.total, stats.sent + stats.failed)) },
  { label: CAMPAIGN_COPY.stats.sent, value: formatCampaignCount(stats.sent) },
  { label: CAMPAIGN_COPY.stats.failed, value: formatCampaignCount(stats.failed) },
  { label: CAMPAIGN_COPY.stats.opened, value: formatCampaignCount(stats.opened) }
]
