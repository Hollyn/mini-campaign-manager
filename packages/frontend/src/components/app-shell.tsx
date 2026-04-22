import { Outlet } from 'react-router-dom'

import { useAppShell } from '../hooks/use-app-shell'
import { AppShellHeader } from './app-shell-header'
import { AppShellSidebar } from './app-shell-sidebar'

export const AppShell = () => {
  const shell = useAppShell()

  return (
    <main className="flex min-h-screen w-full flex-col bg-[linear-gradient(180deg,#faf8ff_0%,#f4f5ff_100%)] text-on-surface">
      <div className="flex h-full w-full flex-1 gap-4 overflow-hidden px-3 py-3 sm:px-4 sm:py-4 lg:flex-row lg:px-5 lg:py-5">
        <AppShellSidebar
          isLoggingOut={shell.isLoggingOut}
          logoutLabel={shell.logoutLabel}
          onLogout={shell.onLogout}
          user={shell.user}
        />

        <section className="min-w-0 flex-1 overflow-y-auto space-y-6 sm:space-y-8">
          <AppShellHeader pageMeta={shell.pageMeta} />
          <Outlet />
        </section>
      </div>
    </main>
  )
}
