import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { createRecipient } from '../api/recipients'
import { ApiRequestError } from '../api/client'
import { CreateRecipientRequest, RecipientResponse } from '../api/types'
import { RECIPIENT_QUERY_KEYS } from '../constants/recipients'

type CreateRecipientOptions = Omit<
  UseMutationOptions<RecipientResponse, ApiRequestError, CreateRecipientRequest>,
  'mutationFn'
>

export const useCreateRecipient = (options?: CreateRecipientOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: createRecipient,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: RECIPIENT_QUERY_KEYS.all })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
