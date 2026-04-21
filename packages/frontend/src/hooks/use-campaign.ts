import { useQuery } from '@tanstack/react-query'

import { getCampaign } from '../api/campaigns'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

type CampaignRefetchInterval =
  | false
  | number
  | ((data: Awaited<ReturnType<typeof getCampaign>> | undefined) => false | number)

export const useCampaign = (campaignId: string, refetchInterval: CampaignRefetchInterval = false) =>
  useQuery({
    enabled: campaignId.length > 0,
    queryFn: () => getCampaign(campaignId),
    queryKey: CAMPAIGN_QUERY_KEYS.detail(campaignId),
    refetchInterval: (query) =>
      typeof refetchInterval === 'function' ? refetchInterval(query.state.data) : refetchInterval,
    staleTime: 15 * 1000
  })
