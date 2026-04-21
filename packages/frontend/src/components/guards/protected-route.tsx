import { Navigate, Outlet } from 'react-router-dom'

import { AUTH_ROUTES } from '../../constants/auth'
import { useAuthStore } from '../../store/auth-store'

export const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate replace to={AUTH_ROUTES.login} />
  }

  return <Outlet />
}
