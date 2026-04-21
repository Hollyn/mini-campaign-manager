import { CampaignStats, CampaignStatus } from '../api/types'
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

export const getCampaignStatCards = (stats: CampaignStats) => [
  { label: CAMPAIGN_COPY.stats.recipients, value: formatCampaignCount(stats.total) },
  { label: CAMPAIGN_COPY.stats.sent, value: formatCampaignCount(stats.sent) },
  { label: CAMPAIGN_COPY.stats.failed, value: formatCampaignCount(stats.failed) },
  { label: CAMPAIGN_COPY.stats.opened, value: formatCampaignCount(stats.opened) }
]
