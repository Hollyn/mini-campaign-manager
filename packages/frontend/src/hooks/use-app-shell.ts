import { useLocation } from 'react-router-dom'

import { getAppShellPageMeta } from '../constants/app'
import { AUTH_COPY } from '../constants/auth'
import { useAuthStore } from '../store/auth-store'
import { useLogout } from './use-logout'

export const useAppShell = () => {
  const pathname = useLocation().pathname
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return {
    isLoggingOut: logout.isPending,
    logoutLabel: logout.isPending ? AUTH_COPY.logout.pendingLabel : AUTH_COPY.logout.label,
    onLogout: () => logout.mutate(),
    pageMeta: getAppShellPageMeta(pathname),
    user
  }
}
