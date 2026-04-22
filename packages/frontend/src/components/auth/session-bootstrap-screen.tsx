import { AUTH_COPY } from '../../constants/auth'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { AuthLayout } from './auth-layout'

interface SessionBootstrapScreenProps {
  errorMessage: string | null
  isLoading: boolean
  onRetry: () => void
}

export const SessionBootstrapScreen = ({ errorMessage, isLoading, onRetry }: SessionBootstrapScreenProps) => {
  if (isLoading) {
    return (
      <AuthLayout>
        <section
          aria-busy="true"
          className="space-y-6 rounded-[1.5rem] border border-white/70 bg-surface-container-lowest/90 p-6 shadow-[var(--shadow-auth-card)] backdrop-blur-xl sm:p-8"
        >
          <div className="space-y-3 text-center">
            <p className="text-[0.72rem] font-medium tracking-[0.08em] text-on-surface-variant">
              {AUTH_COPY.bootstrap.eyebrow}
            </p>
            <div className="space-y-2">
              <h1 className="font-body text-[2rem] font-medium leading-none tracking-tight text-on-background sm:text-[2.25rem]">
                {AUTH_COPY.bootstrap.loadingTitle}
              </h1>
              <p className="mx-auto max-w-sm text-sm leading-6 text-on-surface-variant">
                {AUTH_COPY.bootstrap.loadingDescription}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-12 rounded-xl" />
            <Skeleton className="h-24 rounded-2xl" />
          </div>
        </section>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <section className="space-y-6 rounded-[1.5rem] border border-white/70 bg-surface-container-lowest/90 p-6 shadow-[var(--shadow-auth-card)] backdrop-blur-xl sm:p-8">
        <div className="space-y-2 text-center">
          <p className="text-[0.72rem] font-medium tracking-[0.08em] text-on-surface-variant">
            {AUTH_COPY.bootstrap.eyebrow}
          </p>
          <div className="space-y-2">
            <h1 className="font-body text-[2rem] font-medium leading-none tracking-tight text-on-background sm:text-[2.25rem]">
              {AUTH_COPY.bootstrap.title}
            </h1>
            <p className="mx-auto max-w-sm text-sm leading-6 text-on-surface-variant">
              {AUTH_COPY.bootstrap.description}
            </p>
          </div>
        </div>

        {errorMessage ? (
          <Alert className="space-y-1" variant="destructive">
            <p className="font-medium">{AUTH_COPY.genericError}</p>
            <p className="text-xs text-on-error-container/85">{errorMessage}</p>
          </Alert>
        ) : null}

        <Button className="h-12 w-full rounded-xl text-sm font-semibold shadow-sm" onClick={onRetry} type="button">
          {AUTH_COPY.bootstrap.cta}
        </Button>
      </section>
    </AuthLayout>
  )
}
