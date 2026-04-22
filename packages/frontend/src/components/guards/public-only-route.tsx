import { Navigate, Outlet } from 'react-router-dom'

import { AUTH_ROUTES } from '../../constants/auth'
import { useAuthStore } from '../../store/auth-store'

export const PublicOnlyRoute = () => {
  const token = useAuthStore((state) => state.token)

  if (token) {
    return <Navigate replace to={AUTH_ROUTES.campaigns} />
  }

  return <Outlet />
}
