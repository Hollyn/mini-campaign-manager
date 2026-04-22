import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { scheduleCampaign } from '../api/campaigns'
import { ApiRequestError } from '../api/client'
import { CampaignResponse, ScheduleCampaignRequest } from '../api/types'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

interface ScheduleCampaignVariables {
  id: string
  payload: ScheduleCampaignRequest
}

type ScheduleCampaignOptions = Omit<
  UseMutationOptions<CampaignResponse, ApiRequestError, ScheduleCampaignVariables>,
  'mutationFn'
>

export const useScheduleCampaign = (options?: ScheduleCampaignOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, payload }: ScheduleCampaignVariables) => scheduleCampaign(id, payload),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.all })
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.detail(variables.id) })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
