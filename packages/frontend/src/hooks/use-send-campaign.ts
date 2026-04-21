import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { sendCampaign } from '../api/campaigns'
import { ApiRequestError } from '../api/client'
import { MessageResponse } from '../api/types'
import { CAMPAIGN_QUERY_KEYS } from '../constants/campaigns'

type SendCampaignOptions = Omit<UseMutationOptions<MessageResponse, ApiRequestError, string>, 'mutationFn'>

export const useSendCampaign = (options?: SendCampaignOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: sendCampaign,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.all })
      await queryClient.invalidateQueries({ queryKey: CAMPAIGN_QUERY_KEYS.detail(variables) })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
