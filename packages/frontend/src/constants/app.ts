import { AUTH_ROUTES } from './auth'
import { campaignNewRoute } from './campaigns'

export type AppShellIconName = 'campaigns' | 'logout' | 'recipients' | 'workspace'

export interface AppShellPageMeta {
  section: string
  title: string
}

export const APP_SHELL_NAVIGATION = [
  {
    icon: 'campaigns' as const,
    label: 'Campaigns',
    to: AUTH_ROUTES.campaigns
  },
  {
    icon: 'recipients' as const,
    label: 'Recipients',
    to: AUTH_ROUTES.recipients
  }
] as const

export const APP_SHELL_COPY = {
  brand: 'Mini Campaign Manager',
  navigationLabel: 'Workspace',
  signedInLabel: 'Signed in'
} as const

export const APP_SHELL_PAGE_COPY = {
  campaignDetail: {
    section: 'Campaigns',
    title: 'Campaign Detail'
  },
  campaignEdit: {
    section: 'Campaigns',
    title: 'Edit Campaign'
  },
  campaignNew: {
    section: 'Campaigns',
    title: 'New Campaign'
  },
  campaigns: {
    section: 'Workspace',
    title: 'Campaigns'
  },
  recipients: {
    section: 'Workspace',
    title: 'Recipients'
  }
} as const satisfies Record<string, AppShellPageMeta>

const campaignRoutePrefix = `${AUTH_ROUTES.campaigns}/`
const campaignEditRouteSuffix = '/edit'

export const getAppShellPageMeta = (pathname: string): AppShellPageMeta => {
  if (pathname === campaignNewRoute) {
    return APP_SHELL_PAGE_COPY.campaignNew
  }

  if (pathname.startsWith(campaignRoutePrefix) && pathname.endsWith(campaignEditRouteSuffix)) {
    return APP_SHELL_PAGE_COPY.campaignEdit
  }

  if (pathname.startsWith(campaignRoutePrefix)) {
    return APP_SHELL_PAGE_COPY.campaignDetail
  }

  if (pathname === AUTH_ROUTES.recipients) {
    return APP_SHELL_PAGE_COPY.recipients
  }

  return APP_SHELL_PAGE_COPY.campaigns
}
