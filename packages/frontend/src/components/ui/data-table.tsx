import { ChangeEventHandler, ReactNode } from 'react'

import { SortDirection } from '../../api/types'
import { DATA_TABLE_COPY } from '../../constants/datatable'
import { getPaginationItems } from '../../lib/data-table'
import { cn } from '../../lib/utils'
import { Button } from './button'
import { Card } from './card'
import { Input } from './input'
import { Select } from './select'

interface DataTableProps {
  actions?: ReactNode
  children: ReactNode
  currentPage: number
  dense?: boolean
  isRefetching: boolean
  onNextPage: () => void
  onPageChange: (page: number) => void
  onPageSizeChange: ChangeEventHandler<HTMLSelectElement>
  onPreviousPage: () => void
  onSearchChange: ChangeEventHandler<HTMLInputElement>
  pageSize: number
  pageSizeOptions: readonly number[]
  searchPlaceholder: string
  searchValue: string
  summary: string
  totalPages: number
}

interface DataTableSortButtonProps {
  isActive: boolean
  label: string
  onClick: () => void
  sortDirection: SortDirection
}

const SortIcon = ({ isActive, sortDirection }: Pick<DataTableSortButtonProps, 'isActive' | 'sortDirection'>) => (
  <span className="flex h-4 w-4 items-center justify-center text-xs">
    {isActive ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
  </span>
)

export const DataTableSortButton = ({
  isActive,
  label,
  onClick,
  sortDirection
}: DataTableSortButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center gap-2 text-sm font-medium transition-colors',
      isActive ? 'text-on-background' : 'text-on-surface-variant hover:text-on-background'
    )}
    onClick={onClick}
    type="button"
  >
    <span>{label}</span>
    <SortIcon isActive={isActive} sortDirection={sortDirection} />
  </button>
)

export const DataTable = ({
  actions,
  children,
  currentPage,
  dense = false,
  isRefetching,
  onNextPage,
  onPageChange,
  onPageSizeChange,
  onPreviousPage,
  onSearchChange,
  pageSize,
  pageSizeOptions,
  searchPlaceholder,
  searchValue,
  summary,
  totalPages
}: DataTableProps) => {
  const displayPage = totalPages === 0 ? 0 : currentPage
  const paginationItems = getPaginationItems(displayPage, totalPages)

  return (
    <Card className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-surface-container-lowest/95">
      <div
        className={cn(
          'flex flex-col border-b border-surface-container-low lg:flex-row lg:items-center lg:justify-between',
          dense ? 'gap-2 px-4 py-4 sm:px-5' : 'gap-3 px-6 py-5'
        )}
      >
        <div className="w-full lg:max-w-sm">
          <label className="sr-only" htmlFor="datatable-search">
            {DATA_TABLE_COPY.labels.search}
          </label>
          <Input
            id="datatable-search"
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            type="search"
            value={searchValue}
          />
        </div>

        <div className={cn('flex flex-col sm:flex-row sm:items-center', dense ? 'gap-2' : 'gap-3')}>
          <div className="flex items-center gap-3 text-sm text-on-surface-variant">
            <span>{DATA_TABLE_COPY.labels.rows}</span>
            <Select className="w-[92px]" onChange={onPageSizeChange} value={String(pageSize)}>
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
          {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
        </div>
      </div>

      <div className="overflow-x-auto">{children}</div>

      <div
        className={cn(
          'flex flex-col border-t border-surface-container-low sm:flex-row sm:items-center sm:justify-between',
          dense ? 'gap-3 px-4 py-4 sm:px-5' : 'gap-4 px-6 py-5'
        )}
      >
        <div className="flex items-center gap-3 text-sm text-on-surface-variant">
          <span>{summary}</span>
          {isRefetching ? <span className="text-primary">{DATA_TABLE_COPY.states.refreshing}</span> : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:justify-end">
          <Button
            aria-label={DATA_TABLE_COPY.actions.previous}
            className="min-w-11 px-3"
            disabled={displayPage <= 1}
            onClick={onPreviousPage}
            type="button"
            variant="secondary"
          >
            <span aria-hidden="true">&larr;</span>
          </Button>

          {paginationItems.length > 1 ? (
            <div className="flex flex-wrap items-center gap-2">
              {paginationItems.map((item, index) =>
                item === 'ellipsis' ? (
                  <span className="px-2 text-sm text-on-surface-variant" key={`ellipsis-${index}`}>
                    ...
                  </span>
                ) : (
                  <Button
                    aria-current={item === displayPage ? 'page' : undefined}
                    aria-label={DATA_TABLE_COPY.labels.page(item)}
                    className={cn('min-w-11 px-3', item === displayPage ? 'shadow-[0_10px_24px_rgba(31,49,89,0.14)]' : '')}
                    key={item}
                    onClick={() => onPageChange(item)}
                    type="button"
                    variant={item === displayPage ? 'primary' : 'secondary'}
                  >
                    {item}
                  </Button>
                )
              )}
            </div>
          ) : null}

          <Button
            aria-label={DATA_TABLE_COPY.actions.next}
            className="min-w-11 px-3"
            disabled={displayPage === 0 || displayPage >= totalPages}
            onClick={onNextPage}
            type="button"
            variant="secondary"
          >
            <span aria-hidden="true">&rarr;</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
