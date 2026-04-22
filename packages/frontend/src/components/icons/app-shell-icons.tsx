import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { AppShellIconName } from '../../constants/app'
import { cn } from '../../lib/utils'

interface AppShellIconProps extends ComponentPropsWithoutRef<'svg'> {
  name: AppShellIconName
}

const iconPaths: Record<AppShellIconName, ReactNode> = {
  campaigns: (
    <>
      <rect height="6" rx="1.5" width="16" x="4" y="5" />
      <rect height="6" rx="1.5" width="16" x="4" y="13" />
    </>
  ),
  logout: (
    <>
      <path d="M10 6H7.5C6.67157 6 6 6.67157 6 7.5V16.5C6 17.3284 6.67157 18 7.5 18H10" />
      <path d="M13 8L17 12L13 16" />
      <path d="M17 12H9" />
    </>
  ),
  recipients: (
    <>
      <circle cx="9" cy="9" r="3" />
      <path d="M4.5 18C4.5 15.5147 6.51472 13.5 9 13.5C11.4853 13.5 13.5 15.5147 13.5 18" />
      <circle cx="17" cy="10" r="2" />
      <path d="M14.5 18C14.5 16.067 16.067 14.5 18 14.5" />
    </>
  ),
  workspace: (
    <>
      <rect height="14" rx="3" width="14" x="5" y="5" />
      <path d="M9 9H15" />
      <path d="M9 13H15" />
    </>
  )
}

export const AppShellIcon = ({ className, name, ...props }: AppShellIconProps) => (
  <svg
    aria-hidden="true"
    className={cn('h-5 w-5 fill-none stroke-current stroke-[1.8]', className)}
    viewBox="0 0 24 24"
    {...props}
  >
    {iconPaths[name]}
  </svg>
)
