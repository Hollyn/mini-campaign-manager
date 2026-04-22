import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { createCampaign } from '../api/campaigns'
import { ApiRequestError } from '../api/client'
import { CampaignResponse, CreateCampaignRequest } from '../api/types'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

type CreateCampaignOptions = Omit<UseMutationOptions<CampaignResponse, ApiRequestError, CreateCampaignRequest>, 'mutationFn'>

export const useCreateCampaign = (options?: CreateCampaignOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createCampaign,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.all })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
