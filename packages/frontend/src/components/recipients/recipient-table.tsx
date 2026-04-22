import { ChangeEvent } from 'react'

import { PaginationMeta, Recipient, RecipientListSortBy, SortDirection } from '../../api/types'
import { RECIPIENT_COPY } from '../../constants/recipients'
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from '../../constants/datatable'
import { getPageRange } from '../../lib/data-table'
import { Button } from '../ui/button'
import { DataTable, DataTableSortButton } from '../ui/data-table'

interface RecipientTableProps {
  isRefetching: boolean
  onAddRecipient: () => void
  onDelete: (recipient: Recipient) => void
  onEdit: (recipient: Recipient) => void
  onNextPage: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onPreviousPage: () => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSortChange: (sortBy: RecipientListSortBy) => void
  pageSize: number
  pagination: PaginationMeta | null
  recipients: Recipient[]
  search: string
  sortBy: RecipientListSortBy
  sortDirection: SortDirection
}

const getRecipientInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

export const RecipientTable = ({
  isRefetching,
  onAddRecipient,
  onDelete,
  onEdit,
  onNextPage,
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
  sortDirection
}: RecipientTableProps) => {
  const { end, start } = getPageRange(pagination, recipients.length)

  return (
    <DataTable
      actions={
        <Button onClick={onAddRecipient} type="button">
          {RECIPIENT_COPY.actions.add}
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
      searchPlaceholder={RECIPIENT_COPY.list.searchPlaceholder}
      searchValue={search}
      summary={RECIPIENT_COPY.helper.pagination(start, end, pagination?.total ?? 0)}
      totalPages={pagination?.totalPages ?? 0}
    >
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-surface-container-low text-on-surface-variant">
          <tr>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'name'}
                label={RECIPIENT_COPY.headers.name}
                onClick={() => onSortChange('name')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4">
              <DataTableSortButton
                isActive={sortBy === 'email'}
                label={RECIPIENT_COPY.headers.email}
                onClick={() => onSortChange('email')}
                sortDirection={sortDirection}
              />
            </th>
            <th className="px-6 py-4 text-right">{RECIPIENT_COPY.headers.actions}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-low">
          {recipients.length > 0 ? (
            recipients.map((recipient) => (
              <tr className="transition-colors hover:bg-surface-container-low/65" key={recipient.id}>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-container text-xs font-medium text-on-primary-container">
                      {getRecipientInitials(recipient.name)}
                    </div>
                    <p className="font-medium text-on-background">{recipient.name}</p>
                  </div>
                </td>
                <td className="px-6 py-5 text-on-surface-variant">{recipient.email}</td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Button onClick={() => onEdit(recipient)} type="button" variant="tertiary">
                      {RECIPIENT_COPY.actions.edit}
                    </Button>
                    <Button onClick={() => onDelete(recipient)} type="button" variant="destructive">
                      {RECIPIENT_COPY.actions.delete}
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-10 text-center text-sm text-on-surface-variant" colSpan={3}>
                {RECIPIENT_COPY.list.empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </DataTable>
  )
}
