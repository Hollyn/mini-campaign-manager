import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'

import { getCurrentUser } from '../api/auth'
import { ApiRequestError } from '../api/client'
import { AUTH_QUERY_KEYS } from '../constants/auth'
import { useAuthStore } from '../store/auth-store'

export const useAuthSession = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const setAuth = useAuthStore((state) => state.setAuth)

  const query = useQuery({
    queryFn: getCurrentUser,
    queryKey: AUTH_QUERY_KEYS.session,
    retry: false,
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (query.data) {
      setAuth(query.data.user)
    }
  }, [query.data, setAuth])

  useEffect(() => {
    if (query.error instanceof ApiRequestError && query.error.status === 401) {
      clearAuth()
    }
  }, [clearAuth, query.error])

  return query
}
