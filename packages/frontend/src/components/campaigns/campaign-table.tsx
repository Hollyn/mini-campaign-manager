import { ChangeEvent, MouseEvent } from 'react'

import { CampaignListItem, CampaignListSortBy, PaginationMeta, SortDirection } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from '../../constants/datatable'
import { formatCampaignDate } from '../../lib/campaign-format'
import { getPageRange } from '../../lib/data-table'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { DataTable, DataTableSortButton } from '../ui/data-table'
import { CampaignStatusBadge } from './campaign-status-badge'

interface CampaignTableProps {
  campaigns: CampaignListItem[]
  isRefetching: boolean
  onCreateCampaign: () => void
  onDeleteCampaign: (campaign: CampaignListItem) => void
  onEditCampaign: (campaignId: string) => void
  onNextPage: () => void
  onOpenCampaign: (campaignId: string) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onPreviousPage: () => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSortChange: (sortBy: CampaignListSortBy) => void
  pageSize: number
  pagination: PaginationMeta | null
  search: string
  sortBy: CampaignListSortBy
  sortDirection: SortDirection
}

export const CampaignTable = ({
  campaigns,
  isRefetching,
  onCreateCampaign,
  onDeleteCampaign,
  onEditCampaign,
  onNextPage,
  onOpenCampaign,
  onPageChange,
  onPageSizeChange,
  onPreviousPage,
  onSearchChange,
  onSortChange,
  pageSize,
  pagination,
  search,
  sortBy,
  sortDirection
}: CampaignTableProps) => {
  const { end, start } = getPageRange(pagination, campaigns.length)

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>, action: () => void) => {
    event.stopPropagation()
    action()
  }

  return (
    <DataTable
      actions={
        <Button onClick={onCreateCampaign} type="button">
          {CAMPAIGN_COPY.actions.create}
        </Button>
      }
      currentPage={pagination?.page ?? 1}
      isRefetching={isRefetching}
      onNextPage={onNextPage}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onPreviousPage={onPreviousPage}
      onSearchChange={onSearchChange}
      pageSize={pageSize}
      pageSizeOptions={DATA_TABLE_PAGE_SIZE_OPTIONS}
      searchPlaceholder={CAMPAIGN_COPY.list.searchPlaceholder}
      searchValue={search}
      summary={CAMPAIGN_COPY.helper.pagination(start, end, pagination?.total ?? 0)}
      totalPages={pagination?.totalPages ?? 0}
    >
      <div className="space-y-6 p-6">
        <div className="flex flex-wrap items-center gap-3 rounded-[1.25rem] bg-surface-container-low px-4 py-4">
          <span className="text-sm font-medium text-on-background">{CAMPAIGN_COPY.list.sortByLabel}</span>
          <DataTableSortButton
            isActive={sortBy === 'createdAt'}
            label={CAMPAIGN_COPY.headers.createdAt}
            onClick={() => onSortChange('createdAt')}
            sortDirection={sortDirection}
          />
          <DataTableSortButton
            isActive={sortBy === 'name'}
            label={CAMPAIGN_COPY.headers.name}
            onClick={() => onSortChange('name')}
            sortDirection={sortDirection}
          />
          <DataTableSortButton
            isActive={sortBy === 'status'}
            label={CAMPAIGN_COPY.headers.status}
            onClick={() => onSortChange('status')}
            sortDirection={sortDirection}
          />
          <DataTableSortButton
            isActive={sortBy === 'recipientCount'}
            label={CAMPAIGN_COPY.headers.recipients}
            onClick={() => onSortChange('recipientCount')}
            sortDirection={sortDirection}
          />
          <DataTableSortButton
            isActive={sortBy === 'subject'}
            label={CAMPAIGN_COPY.headers.subject}
            onClick={() => onSortChange('subject')}
            sortDirection={sortDirection}
          />
        </div>

        {campaigns.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {campaigns.map((campaign) => (
              <Card
                className="cursor-pointer rounded-[1.5rem] border border-white/70 bg-white/90 p-5 transition-transform duration-200 hover:-translate-y-0.5"
                key={campaign.id}
                onClick={() => onOpenCampaign(campaign.id)}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-2">
                    <CampaignStatusBadge status={campaign.status} />
                    <div className="space-y-1">
                      <h3 className="text-lg font-medium tracking-tight text-on-background">{campaign.name}</h3>
                      <p className="max-w-xl text-sm leading-6 text-on-surface-variant">{campaign.subject}</p>
                    </div>
                  </div>

                  <div className="grid gap-2 text-right text-sm">
                    <div>
                      <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
                        {CAMPAIGN_COPY.headers.recipients}
                      </p>
                      <p className="font-medium text-on-background">{campaign.recipientCount}</p>
                    </div>
                    <div>
                      <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
                        {CAMPAIGN_COPY.headers.createdAt}
                      </p>
                      <p className="font-medium text-on-background">{formatCampaignDate(campaign.createdAt)}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
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
              </Card>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-surface-container-high bg-surface-container-low px-6 py-12 text-center text-sm text-on-surface-variant">
            {CAMPAIGN_COPY.list.empty}
          </div>
        )}
      </div>
    </DataTable>
  )
}
