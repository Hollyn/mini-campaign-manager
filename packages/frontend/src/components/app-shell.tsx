import { NavLink, Outlet } from 'react-router-dom'

import { APP_SHELL_COPY, APP_SHELL_NAVIGATION } from '../constants/app'
import { AUTH_COPY } from '../constants/auth'
import { useLogout } from '../hooks/use-logout'
import { useAuthStore } from '../store/auth-store'
import { Button } from './ui/button'
import { Card } from './ui/card'

export const AppShell = () => {
  const user = useAuthStore((state) => state.user)
  const logout = useLogout()

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#faf8ff_0%,#f4f5ff_100%)] text-on-surface">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:px-8 lg:py-8">
        <aside className="w-full shrink-0 lg:w-[300px]">
          <Card className="h-full rounded-[2rem] border border-white/70 bg-[linear-gradient(160deg,rgba(242,243,255,0.98),rgba(226,231,255,0.98))] p-6 sm:p-7">
            <div className="flex h-full flex-col gap-8">
              <div className="space-y-4">
                <div className="inline-flex rounded-full bg-primary px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-on-primary">
                  {APP_SHELL_COPY.brand}
                </div>
                <div className="space-y-3">
                  <h1 className="text-3xl font-medium tracking-tight text-on-background">{APP_SHELL_COPY.heading}</h1>
                  <p className="text-sm leading-7 text-on-surface-variant">{APP_SHELL_COPY.description}</p>
                </div>
              </div>

              <nav className="space-y-2">
                {APP_SHELL_NAVIGATION.map((item) => (
                  <NavLink
                    className={({ isActive }) =>
                      [
                        'block rounded-[1.25rem] px-4 py-4 transition-colors',
                        isActive
                          ? 'bg-white text-on-background shadow-[0_16px_40px_rgba(31,49,89,0.08)]'
                          : 'text-on-surface-variant hover:bg-white/60 hover:text-on-surface'
                      ].join(' ')
                    }
                    key={item.to}
                    to={item.to}
                  >
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em]">{item.description}</p>
                  </NavLink>
                ))}
              </nav>

              <Card className="rounded-[1.5rem] bg-white/75 p-5 shadow-[0_18px_50px_rgba(31,49,89,0.08)]">
                <p className="text-[0.72rem] uppercase tracking-[0.26em] text-on-surface-variant">{APP_SHELL_COPY.signedInLabel}</p>
                <p className="mt-3 text-lg font-medium text-on-background">{user?.name}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{user?.email}</p>
              </Card>

              <Button onClick={() => logout.mutate()} type="button" variant="secondary">
                {logout.isPending ? AUTH_COPY.logout.pendingLabel : AUTH_COPY.logout.label}
              </Button>
            </div>
          </Card>
        </aside>

        <section className="min-w-0 flex-1">
          <Outlet />
        </section>
      </div>
    </main>
  )
}
