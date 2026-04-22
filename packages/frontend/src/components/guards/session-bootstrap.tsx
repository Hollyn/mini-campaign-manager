import { Outlet } from 'react-router-dom'

import { SessionBootstrapScreen } from '../auth/session-bootstrap-screen'
import { useAuthSession } from '../../hooks/use-auth-session'

export const SessionBootstrap = () => {
  const session = useAuthSession()

  if (!session.isReady) {
    return (
      <SessionBootstrapScreen
        errorMessage={session.errorMessage}
        isLoading={session.isLoading}
        onRetry={session.retrySessionCheck}
      />
    )
  }

  return <Outlet />
}
