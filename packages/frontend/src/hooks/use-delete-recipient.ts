import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { deleteRecipient } from '../api/recipients'
import { ApiRequestError } from '../api/client'
import { RECIPIENT_QUERY_KEYS } from '../constants/recipients'

type DeleteRecipientOptions = Omit<UseMutationOptions<void, ApiRequestError, string>, 'mutationFn'>

export const useDeleteRecipient = (options?: DeleteRecipientOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: deleteRecipient,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: RECIPIENT_QUERY_KEYS.all })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
