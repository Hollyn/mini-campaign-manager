import { FOUNDATION_BADGES, FOUNDATION_COPY } from '../constants/app'
import { AUTH_COPY } from '../constants/auth'
import { useLogout } from '../hooks/use-logout'
import { useAuthStore } from '../store/auth-store'
import { Button } from './ui/button'
import { Card } from './ui/card'

export const AppShell = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <main className="min-h-screen bg-surface px-4 py-6 text-on-surface sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4">
        <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="bg-surface-container-low px-6 py-8 sm:px-8 sm:py-10">
            <div className="space-y-5">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.3em] text-primary">
                {FOUNDATION_COPY.eyebrow}
              </p>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-[2.6rem] font-medium leading-none tracking-tight text-on-background sm:text-[4.5rem]">
                  {FOUNDATION_COPY.heading}
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">
                  {FOUNDATION_COPY.description}
                </p>
              </div>
              <p className="text-sm text-on-surface-variant">
                {AUTH_COPY.workspace.welcomePrefix}{' '}
                <span className="font-medium text-on-surface">{user?.name}</span>
              </p>
            </div>
          </Card>

          <Card className="flex flex-col justify-between gap-8 bg-surface-container-highest px-6 py-8 sm:px-8 sm:py-10">
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2">
                {FOUNDATION_BADGES.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-secondary-container px-3 py-1 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-on-secondary-container"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.28em] text-on-surface-variant">
                  {FOUNDATION_COPY.statusLabel}
                </p>
                <p className="text-3xl font-medium tracking-tight text-primary">
                  {FOUNDATION_COPY.statusValue}
                </p>
              </div>
            </div>

            <Button onClick={() => logout.mutate()} type="button" variant="secondary">
              {logout.isPending ? AUTH_COPY.logout.pendingLabel : AUTH_COPY.logout.label}
            </Button>
          </Card>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          {AUTH_COPY.workspace.badges.map((badge) => (
            <Card className="bg-surface-container-lowest px-6 py-6" key={badge}>
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.28em] text-on-surface-variant">
                {AUTH_COPY.workspace.metadataLabel}
              </p>
              <p className="mt-3 text-lg font-medium text-on-background">{badge}</p>
            </Card>
          ))}
        </section>
      </div>
    </main>
  )
}
