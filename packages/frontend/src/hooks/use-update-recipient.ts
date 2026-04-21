import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query'

import { updateRecipient } from '../api/recipients'
import { ApiRequestError } from '../api/client'
import { RecipientResponse, UpdateRecipientRequest } from '../api/types'
import { RECIPIENT_QUERY_KEYS } from '../constants/recipients'

interface UpdateRecipientVariables {
  id: string
  payload: UpdateRecipientRequest
}

type UpdateRecipientOptions = Omit<
  UseMutationOptions<RecipientResponse, ApiRequestError, UpdateRecipientVariables>,
  'mutationFn'
>

export const useUpdateRecipient = (options?: UpdateRecipientOptions) => {
  const queryClient = useQueryClient()

  return useMutation({
    ...options,
    mutationFn: ({ id, payload }: UpdateRecipientVariables) => updateRecipient(id, payload),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({ queryKey: RECIPIENT_QUERY_KEYS.all })
      await options?.onSuccess?.(data, variables, onMutateResult, context)
    }
  })
}
