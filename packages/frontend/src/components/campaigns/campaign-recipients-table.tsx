import { ChangeEvent } from 'react'

import {
  CampaignRecipientActivity,
  CampaignRecipientListSortBy,
  PaginationMeta,
  SortDirection
} from '../../api/types'
import { CAMPAIGN_COPY, CampaignRecipientActivityFilter } from '../../constants/campaigns'
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from '../../constants/datatable'
import { formatCampaignDateTime } from '../../lib/campaign-format'
import { getPageRange } from '../../lib/data-table'
import { DataTable, DataTableSortButton } from '../ui/data-table'
import { CampaignRecipientFilterBar } from './campaign-recipient-filter-bar'
import { CampaignRecipientStatusBadge } from './campaign-recipient-status-badge'

interface CampaignRecipientFilterOption {
  count: number
  label: string
  value: CampaignRecipientActivityFilter
}

interface CampaignRecipientsTableProps {
  activeFilter: CampaignRecipientActivityFilter
  filterOptions: CampaignRecipientFilterOption[]
  isRefetching: boolean
  onNextPage: () => void
  onFilterChange: (value: CampaignRecipientActivityFilter) => void
  onPageChange: (page: number) => void
  onPageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onPreviousPage: () => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSortChange: (sortBy: CampaignRecipientListSortBy) => void
  pageSize: number
  pagination: PaginationMeta | null
  recipients: CampaignRecipientActivity[]
  search: string
  sortBy: CampaignRecipientListSortBy
  sortDirection: SortDirection
  totalRecipients: number
  visibleRecipientCount: number
}

export const CampaignRecipientsTable = ({
  activeFilter,
  filterOptions,
  isRefetching,
  onNextPage,
  onFilterChange,
  onPageChange,
  onPageSizeChange,
  onPreviousPage,
  onSearchChange,
  onSortChange,
  pageSize,
  pagination,
  recipients,
  search,
  sortBy,
  sortDirection,
  totalRecipients,
  visibleRecipientCount
}: CampaignRecipientsTableProps) => {
  const { end, start } = getPageRange(pagination, recipients.length)

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <h3 className="text-xl font-medium tracking-tight text-on-background sm:text-2xl">
          {CAMPAIGN_COPY.detail.recipientsLabel}
        </h3>
        <p className="text-sm font-medium text-on-surface-variant">
          {CAMPAIGN_COPY.detail.recipientViewSummary(visibleRecipientCount, totalRecipients)}
        </p>
      </div>

      <DataTable
        actions={
          <CampaignRecipientFilterBar activeFilter={activeFilter} onChange={onFilterChange} options={filterOptions} />
        }
        currentPage={pagination?.page ?? 1}
        dense
        isRefetching={isRefetching}
        onNextPage={onNextPage}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onPreviousPage={onPreviousPage}
        onSearchChange={onSearchChange}
        pageSize={pageSize}
        pageSizeOptions={DATA_TABLE_PAGE_SIZE_OPTIONS}
        searchPlaceholder={CAMPAIGN_COPY.detail.recipientSearchPlaceholder}
        searchValue={search}
        summary={CAMPAIGN_COPY.helper.recipientPagination(start, end, pagination?.total ?? 0)}
        totalPages={pagination?.totalPages ?? 0}
      >
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-surface-container-low text-on-surface-variant">
            <tr>
              <th className="px-4 py-3 sm:px-5">
                <DataTableSortButton
                  isActive={sortBy === 'name'}
                  label={CAMPAIGN_COPY.headers.recipientName}
                  onClick={() => onSortChange('name')}
                  sortDirection={sortDirection}
                />
              </th>
              <th className="px-4 py-3 sm:px-5">
                <DataTableSortButton
                  isActive={sortBy === 'email'}
                  label={CAMPAIGN_COPY.headers.recipientEmail}
                  onClick={() => onSortChange('email')}
                  sortDirection={sortDirection}
                />
              </th>
              <th className="px-4 py-3 sm:px-5">
                <DataTableSortButton
                  isActive={sortBy === 'status'}
                  label={CAMPAIGN_COPY.headers.recipientStatus}
                  onClick={() => onSortChange('status')}
                  sortDirection={sortDirection}
                />
              </th>
              <th className="px-4 py-3 sm:px-5">
                <DataTableSortButton
                  isActive={sortBy === 'sentAt'}
                  label={CAMPAIGN_COPY.headers.recipientSentAt}
                  onClick={() => onSortChange('sentAt')}
                  sortDirection={sortDirection}
                />
              </th>
              <th className="px-4 py-3 sm:px-5">
                <DataTableSortButton
                  isActive={sortBy === 'openedAt'}
                  label={CAMPAIGN_COPY.headers.recipientOpenedAt}
                  onClick={() => onSortChange('openedAt')}
                  sortDirection={sortDirection}
                />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {recipients.length > 0 ? (
              recipients.map((recipient) => (
                <tr className="transition-colors hover:bg-surface-container-low/65" key={recipient.recipientId}>
                  <td className="px-4 py-4 font-medium text-on-background sm:px-5">{recipient.name}</td>
                  <td className="px-4 py-4 text-on-surface-variant sm:px-5">{recipient.email}</td>
                  <td className="px-4 py-4 sm:px-5">
                    <CampaignRecipientStatusBadge status={recipient.status} />
                  </td>
                  <td className="px-4 py-4 text-on-surface-variant sm:px-5">{formatCampaignDateTime(recipient.sentAt)}</td>
                  <td className="px-4 py-4 text-on-surface-variant sm:px-5">{formatCampaignDateTime(recipient.openedAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-8 text-center text-sm text-on-surface-variant sm:px-5" colSpan={5}>
                  {CAMPAIGN_COPY.detail.recipientsEmpty}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </DataTable>
    </section>
  )
}
