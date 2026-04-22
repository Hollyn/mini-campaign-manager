import { MutationCache, QueryClient } from '@tanstack/react-query'

import { TOAST_COPY } from '../constants/toast'
import { pushToast } from '../store/toast-store'
import { getRequestErrorMessage } from './request-error'

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      pushToast({
        description: getRequestErrorMessage(error, TOAST_COPY.genericError),
        title: TOAST_COPY.errorTitle
      })
    }
  })
})
