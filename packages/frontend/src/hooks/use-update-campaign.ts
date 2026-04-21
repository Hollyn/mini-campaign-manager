import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { updateCampaign } from '../api/campaigns'
import { ApiRequestError } from '../api/client'
import { CampaignResponse, UpdateCampaignRequest } from '../api/types'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

interface UpdateCampaignVariables {
  id: string
  payload: UpdateCampaignRequest
}

type UpdateCampaignOptions = Omit<
  UseMutationOptions<CampaignResponse, ApiRequestError, UpdateCampaignVariables>,
  'mutationFn'
>

export const useUpdateCampaign = (options?: UpdateCampaignOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, payload }: UpdateCampaignVariables) => updateCampaign(id, payload),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.all })
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.detail(variables.id) })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
