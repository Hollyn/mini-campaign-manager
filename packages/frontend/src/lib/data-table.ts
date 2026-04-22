import { PaginationMeta, SortDirection } from '../api/types'

export type PaginationItem = number | 'ellipsis'

export const toggleSort = <T extends string>(currentField: T, currentDirection: SortDirection, nextField: T) => ({
  direction: currentField === nextField && currentDirection === 'asc' ? ('desc' as const) : ('asc' as const),
  field: nextField
})

export const getPageRange = (pagination: PaginationMeta | null, rowCount: number) => {
  if (!pagination || pagination.total === 0 || rowCount === 0) {
    return { end: 0, start: 0 }
  }

  const start = (pagination.page - 1) * pagination.limit + 1
  const end = Math.min(start + rowCount - 1, pagination.total)

  return { end, start }
}

export const getPaginationItems = (currentPage: number, totalPages: number): PaginationItem[] => {
  if (totalPages <= 0) {
    return []
  }

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1)
  }

  const items: PaginationItem[] = [1]
  const leftSibling = Math.max(currentPage - 1, 2)
  const rightSibling = Math.min(currentPage + 1, totalPages - 1)

  if (leftSibling > 2) {
    items.push('ellipsis')
  }

  for (let page = leftSibling; page <= rightSibling; page += 1) {
    items.push(page)
  }

  if (rightSibling < totalPages - 1) {
    items.push('ellipsis')
  }

  items.push(totalPages)

  return items
}

export const createPaginationMeta = (page: number, limit: number, total: number): PaginationMeta => ({
  limit,
  page: total === 0 ? 1 : page,
  total,
  totalPages: total === 0 ? 0 : Math.ceil(total / limit)
})
