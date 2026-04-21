import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteCampaign } from '../api/campaigns'
import { ApiRequestError } from '../api/client'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

type DeleteCampaignOptions = Omit<UseMutationOptions<void, ApiRequestError, string>, 'mutationFn'>

export const useDeleteCampaign = (options?: DeleteCampaignOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deleteCampaign,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.all })
      queryClient.removeQueries({ queryKey: CAMPAIGN_QUERY_KEYS.detail(variables) })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
