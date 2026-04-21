import { useQuery } from '@tanstack/react-query'

import { getRecipients } from '../api/recipients'
import { CAMPAIGN_RECIPIENT_PAGE_SIZE } from '../constants/campaigns'

export const useRecipientOptions = (search: string) =>
  useQuery({
    queryFn: () => getRecipients(1, CAMPAIGN_RECIPIENT_PAGE_SIZE, search),
    queryKey: ['recipient-options', search],
    staleTime: 30 * 1000
  })
