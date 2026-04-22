import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getCampaigns } from '../api/campaigns'
import { CampaignListSortBy, CampaignStatus, SortDirection } from '../api/types'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

export const useCampaigns = (
  page: number,
  limit: number,
  search: string,
  sortBy: CampaignListSortBy,
  sortDirection: SortDirection,
  status?: CampaignStatus
) =>
  useQuery({
    placeholderData: keepPreviousData,
    queryFn: () =>
      getCampaigns({
        limit,
        page,
        search,
        sortBy,
        sortOrder: sortDirection,
        status
      }),
    queryKey: CAMPAIGN_QUERY_KEYS.list(page, limit, search, sortBy, sortDirection, status),
    staleTime: 30 * 1000
  })
