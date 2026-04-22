import { ChangeEvent, MouseEvent } from 'react'

import { CampaignListItem, CampaignListSortBy, PaginationMeta, SortDirection } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from '../../constants/datatable'
import { formatCampaignDate } from '../../lib/campaign-format'
import { getPageRange } from '../../lib/data-table'
import { Button } from '../ui/button'
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
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-surface-container-low text-on-surface-variant">
          <tr>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'name'}
                label={CAMPAIGN_COPY.headers.name}
                onClick={() => onSortChange('name')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'subject'}
                label={CAMPAIGN_COPY.headers.subject}
                onClick={() => onSortChange('subject')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'status'}
                label={CAMPAIGN_COPY.headers.status}
                onClick={() => onSortChange('status')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'recipientCount'}
                label={CAMPAIGN_COPY.headers.recipients}
                onClick={() => onSortChange('recipientCount')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'createdAt'}
                label={CAMPAIGN_COPY.headers.createdAt}
                onClick={() => onSortChange('createdAt')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4 text-right">{CAMPAIGN_COPY.headers.actions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-low">
          {campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <tr
                className="cursor-pointer transition-colors hover:bg-surface-container-low/65"
                key={campaign.id}
                onClick={() => onOpenCampaign(campaign.id)}
              >
                <td className="px-6 py-5 font-medium text-on-background">{campaign.name}</td>
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
            ))
          ) : (
            <tr>
              <td className="px-6 py-10 text-center text-sm text-on-surface-variant" colSpan={6}>
                {CAMPAIGN_COPY.list.empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DataTable>
  )
}
