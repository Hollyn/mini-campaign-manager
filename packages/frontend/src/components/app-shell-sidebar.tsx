import { NavLink } from 'react-router-dom'

import { AuthUser } from '../api/types'
import { APP_SHELL_COPY, APP_SHELL_NAVIGATION } from '../constants/app'
import { cn } from '../lib/utils'
import { AppShellIcon } from './icons/app-shell-icons'
import { Button } from './ui/button'

interface AppShellSidebarProps {
  isLoggingOut: boolean
  logoutLabel: string
  onLogout: () => void
  user: AuthUser | null
}

export const AppShellSidebar = ({
  isLoggingOut,
  logoutLabel,
  onLogout,
  user
}: AppShellSidebarProps) => (
  <aside className="flex w-full shrink-0 overflow-hidden lg:w-[248px]">
    <div className="flex h-full flex-col overflow-y-auto rounded-[1.75rem] border border-white/70 bg-white/80 p-4 shadow-ambient backdrop-blur sm:p-5">
      <div className="flex items-center gap-3 px-1">
        <div className="flex h-11 w-11 items-center justify-center rounded-[1rem] bg-primary text-on-primary">
          <AppShellIcon name="workspace" />
        </div>
        <div className="min-w-0">
          <p className="text-[0.68rem] font-medium tracking-[0.08em] text-on-surface-variant">
            {APP_SHELL_COPY.navigationLabel}
          </p>
          <p className="truncate text-sm font-medium text-on-background">{APP_SHELL_COPY.brand}</p>
        </div>
      </div>

      <nav className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {APP_SHELL_NAVIGATION.map((item) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-[1.1rem] px-4 py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-on-primary shadow-[0_16px_40px_rgba(0,83,220,0.18)]'
                  : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-background'
              )
            }
            key={item.to}
            to={item.to}
          >
            <AppShellIcon name={item.icon} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 space-y-3 border-t border-surface-container-low pt-4 lg:mt-auto">
        {user ? (
          <div className="rounded-[1.25rem] bg-surface-container-low px-4 py-3 text-sm">
            <p className="text-[0.68rem] font-medium tracking-[0.08em] text-on-surface-variant">
              {APP_SHELL_COPY.signedInLabel}
            </p>
            <p className="mt-2 font-medium text-on-background">{user.name}</p>
            <p className="mt-1 truncate text-on-surface-variant">{user.email}</p>
          </div>
        ) : null}

        <Button
          className="w-full justify-start gap-3"
          disabled={isLoggingOut}
          onClick={onLogout}
          type="button"
          variant="secondary"
        >
          <AppShellIcon className="h-4 w-4" name="logout" />
          {logoutLabel}
        </Button>
      </div>
    </div>
  </aside>
)
