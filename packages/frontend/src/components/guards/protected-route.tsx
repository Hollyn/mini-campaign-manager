import { Navigate, Outlet } from 'react-router-dom'

import { AUTH_ROUTES } from '../../constants/auth'
import { useAuthStore } from '../../store/auth-store'

export const ProtectedRoute = () => {
  const isHydrated = useAuthStore((state) => state.isHydrated)
  const user = useAuthStore((state) => state.user)

  if (!isHydrated) {
    return null
  }

  if (!user) {
    return <Navigate replace to={AUTH_ROUTES.login} />
  }

  return <Outlet />
}
