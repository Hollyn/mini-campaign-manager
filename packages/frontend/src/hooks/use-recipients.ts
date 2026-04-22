import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getRecipients } from '../api/recipients'
import { RecipientListSortBy, SortDirection } from '../api/types'
import { RECIPIENT_QUERY_KEYS } from '../constants/recipients'

export const useRecipients = (
  page: number,
  limit: number,
  search: string,
  sortBy: RecipientListSortBy,
  sortDirection: SortDirection
) =>
  useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      getRecipients({
        limit,
        page,
        search,
        sortBy,
        sortOrder: sortDirection
      }),
    queryKey: RECIPIENT_QUERY_KEYS.list(page, limit, search, sortBy, sortDirection),
    staleTime: 30 * 1000
  })
