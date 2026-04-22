import { useQuery } from '@tanstack/react-query'

import { getRecipients } from '../api/recipients'
import { CAMPAIGN_RECIPIENT_PAGE_SIZE } from '../constants/campaigns'
import { RECIPIENT_DEFAULT_SORT } from '../constants/recipients'

export const useRecipientOptions = (search: string) =>
  useQuery({
    queryFn: () =>
      getRecipients({
        limit: CAMPAIGN_RECIPIENT_PAGE_SIZE,
        page: 1,
        search,
        sortBy: RECIPIENT_DEFAULT_SORT.field,
        sortOrder: RECIPIENT_DEFAULT_SORT.direction
      }),
    queryKey: ['recipient-options', search],
    staleTime: 30 * 1000
  })
