import { Navigate, Outlet } from 'react-router-dom'

import { AUTH_ROUTES } from '../../constants/auth'
import { useAuthStore } from '../../store/auth-store'

export const ProtectedRoute = () => {
  const token = useAuthStore((state) => state.token)

  if (!token) {
    return <Navigate replace to={AUTH_ROUTES.login} />
  }

  return <Outlet />
}
