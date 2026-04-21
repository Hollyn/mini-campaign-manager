import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { logout } from '../api/auth'
import { AUTH_QUERY_KEYS, AUTH_ROUTES } from '../constants/auth'
import { useAuthStore } from '../store/auth-store'

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuth()
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEYS.session })
      navigate(AUTH_ROUTES.login, { replace: true })
    }
  })
}
