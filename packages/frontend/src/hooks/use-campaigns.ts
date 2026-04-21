import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getCampaigns } from '../api/campaigns'
import { CampaignStatus } from '../api/types'
import { CAMPAIGN_PAGE_SIZE, CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

export const useCampaigns = (page: number, search: string, status?: CampaignStatus) =>
  useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      getCampaigns({
        limit: CAMPAIGN_PAGE_SIZE,
        page,
        search,
        status
      }),
    queryKey: CAMPAIGN_QUERY_KEYS.list(page, search, status),
    staleTime: 30 * 1000
  })
