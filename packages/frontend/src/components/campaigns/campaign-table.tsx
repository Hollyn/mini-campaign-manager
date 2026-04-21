import { MouseEvent } from 'react'

import { CampaignListItem } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { formatCampaignDate } from '../../lib/campaign-format'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { CampaignStatusBadge } from './campaign-status-badge'

interface PaginationSummary {
  limit: number
  page: number
  total: number
  totalPages: number
}

interface CampaignTableProps {
  campaigns: CampaignListItem[]
  isRefetching: boolean
  onDeleteCampaign: (campaign: CampaignListItem) => void
  onEditCampaign: (campaignId: string) => void
  onNextPage: () => void
  onOpenCampaign: (campaignId: string) => void
  onPreviousPage: () => void
  pagination: PaginationSummary | null
}

export const CampaignTable = ({
  campaigns,
  isRefetching,
  onDeleteCampaign,
  onEditCampaign,
  onNextPage,
  onOpenCampaign,
  onPreviousPage,
  pagination
}: CampaignTableProps) => {
  const start = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0
  const end = pagination ? Math.min(start + campaigns.length - 1, pagination.total) : 0

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>, action: () => void) => {
    event.stopPropagation()
    action()
  }

  return (
    <Card className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95">
      <div className="border-b border-surface-container-low px-6 py-5">
        <h2 className="text-xl font-medium tracking-tight text-on-background">{CAMPAIGN_COPY.list.tableTitle}</h2>
        <p className="mt-1 text-sm text-on-surface-variant">{CAMPAIGN_COPY.list.tableDescription}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-surface-container-low text-[0.72rem] uppercase tracking-[0.24em] text-on-surface-variant">
            <tr>
              <th className="px-6 py-4">{CAMPAIGN_COPY.headers.name}</th>
              <th className="px-6 py-4">{CAMPAIGN_COPY.headers.subject}</th>
              <th className="px-6 py-4">{CAMPAIGN_COPY.headers.status}</th>
              <th className="px-6 py-4">{CAMPAIGN_COPY.headers.recipients}</th>
              <th className="px-6 py-4">{CAMPAIGN_COPY.headers.createdAt}</th>
              <th className="px-6 py-4 text-right">{CAMPAIGN_COPY.headers.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {campaigns.map((campaign) => (
              <tr
                className="cursor-pointer transition-colors hover:bg-surface-container-low/65"
                key={campaign.id}
                onClick={() => onOpenCampaign(campaign.id)}
              >
                <td className="px-6 py-5">
                  <div className="space-y-1 text-left">
                    <p className="font-medium text-on-background">{campaign.name}</p>
                    <p className="text-xs uppercase tracking-[0.22em] text-on-surface-variant">Open campaign detail</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-on-surface-variant">{campaign.subject}</td>
                <td className="px-6 py-5">
                  <CampaignStatusBadge status={campaign.status} />
                </td>
                <td className="px-6 py-5 text-on-surface-variant">{campaign.recipientCount}</td>
                <td className="px-6 py-5 text-on-surface-variant">{formatCampaignDate(campaign.createdAt)}</td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Button
                      onClick={(event) => handleActionClick(event, () => onOpenCampaign(campaign.id))}
                      type="button"
                      variant="tertiary"
                    >
                      {CAMPAIGN_COPY.actions.open}
                    </Button>
                    {campaign.status === 'draft' ? (
                      <>
                        <Button
                          onClick={(event) => handleActionClick(event, () => onEditCampaign(campaign.id))}
                          type="button"
                          variant="secondary"
                        >
                          {CAMPAIGN_COPY.actions.editInline}
                        </Button>
                        <Button
                          onClick={(event) => handleActionClick(event, () => onDeleteCampaign(campaign))}
                          type="button"
                          variant="destructive"
                        >
                          {CAMPAIGN_COPY.actions.delete}
                        </Button>
                      </>
                    ) : null}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-surface-container-low px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-on-surface-variant">{CAMPAIGN_COPY.helper.pagination(start, end, pagination?.total ?? 0)}</p>
          {isRefetching ? <p className="mt-1 text-xs uppercase tracking-[0.22em] text-primary">{CAMPAIGN_COPY.helper.refreshing}</p> : null}
        </div>
        <div className="flex gap-3">
          <Button disabled={!pagination || pagination.page <= 1} onClick={onPreviousPage} type="button" variant="secondary">
            {CAMPAIGN_COPY.actions.previousPage}
          </Button>
          <Button disabled={!pagination || pagination.page >= pagination.totalPages} onClick={onNextPage} type="button">
            {CAMPAIGN_COPY.actions.nextPage}
          </Button>
        </div>
      </div>
    </Card>
  )
}
