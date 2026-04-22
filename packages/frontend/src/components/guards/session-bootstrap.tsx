import { Outlet } from 'react-router-dom'

import { ApiRequestError } from '../../api/client'
import { AUTH_COPY } from '../../constants/auth'
import { useAuthSession } from '../../hooks/use-auth-session'
import { useAuthStore } from '../../store/auth-store'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

const SessionBootstrapSkeleton = () => (
  <main className="min-h-screen bg-surface px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
    <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="space-y-6 bg-surface-container-low px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <Skeleton className="h-11 w-11 rounded-md bg-surface-container-highest" />
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-20 w-full max-w-xl" />
        <Skeleton className="h-6 w-full max-w-lg" />
      </Card>
      <Card className="space-y-5 bg-surface-container-highest px-6 py-8 sm:px-8 sm:py-10 lg:px-10">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-12 w-72" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </Card>
    </div>
  </main>
)

export const SessionBootstrap = () => {
  const isBootstrapped = useAuthStore((state) => state.isBootstrapped)
  const sessionQuery = useAuthSession()

  if (!isBootstrapped && sessionQuery.isPending) {
    return <SessionBootstrapSkeleton />
  }

  if (
    !isBootstrapped &&
    sessionQuery.isError &&
    (!(sessionQuery.error instanceof ApiRequestError) || sessionQuery.error.status !== 401)
  ) {
    return (
      <main className="flex min-h-screen items-center bg-surface px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <Card className="mx-auto max-w-xl space-y-4 bg-surface-container-lowest p-8 sm:p-10">
          <p className="text-[0.75rem] font-medium tracking-[0.08em] text-on-surface-variant">
            {AUTH_COPY.bootstrap.eyebrow}
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-on-background">
            {AUTH_COPY.bootstrap.title}
          </h1>
          <p className="text-sm leading-6 text-on-surface-variant">{AUTH_COPY.bootstrap.description}</p>
          <Button onClick={() => sessionQuery.refetch()} type="button">
            {AUTH_COPY.bootstrap.cta}
          </Button>
        </Card>
      </main>
    )
  }

  return <Outlet />
}
