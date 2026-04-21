import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getRecipients } from '../api/recipients'
import { RECIPIENT_PAGE_SIZE, RECIPIENT_QUERY_KEYS } from '../constants/recipients'

export const useRecipients = (page: number) =>
  useQuery({
    placeholderData: keepPreviousData,
    queryFn: () => getRecipients(page, RECIPIENT_PAGE_SIZE),
    queryKey: RECIPIENT_QUERY_KEYS.list(page),
    staleTime: 30 * 1000
  })
