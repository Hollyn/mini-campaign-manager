import { useEffect, useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '../api/auth'
import { ApiRequestError } from '../api/client'
import { AUTH_COPY, AUTH_QUERY_KEYS } from '../constants/auth'
import { getRequestErrorMessage } from '../lib/request-error'
import { useAuthStore } from '../store/auth-store'

const isUnauthorizedError = (error: unknown) => error instanceof ApiRequestError && error.status === 401

export const useAuthSession = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const hydrateAuth = useAuthStore((state) => state.hydrateAuth)
  const isHydrated = useAuthStore((state) => state.isHydrated)

  const sessionQuery = useQuery({
    queryFn: getCurrentUser,
    queryKey: AUTH_QUERY_KEYS.session,
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (sessionQuery.isSuccess) {
      hydrateAuth(sessionQuery.data.user)
    }
  }, [hydrateAuth, sessionQuery.data, sessionQuery.isSuccess])

  useEffect(() => {
    if (sessionQuery.isError && isUnauthorizedError(sessionQuery.error)) {
      clearAuth()
    }
  }, [clearAuth, sessionQuery.error, sessionQuery.isError])

  const errorMessage = useMemo(() => {
    if (!sessionQuery.isError || isUnauthorizedError(sessionQuery.error)) {
      return null
    }

    return getRequestErrorMessage(sessionQuery.error, AUTH_COPY.genericError)
  }, [sessionQuery.error, sessionQuery.isError])

  return {
    errorMessage,
    isLoading: !isHydrated && errorMessage === null,
    isReady: isHydrated && errorMessage === null,
    retrySessionCheck: () => sessionQuery.refetch()
  }
}
