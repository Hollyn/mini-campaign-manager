export const APP_SHELL_NAVIGATION = [
  {
    description: 'Draft and monitor sends',
    label: 'Campaigns',
    to: '/campaigns'
  },
  {
    description: 'Manage contact records',
    label: 'Recipients',
    to: '/recipients'
  }
] as const

export const APP_SHELL_COPY = {
  brand: 'Mini Campaign Manager',
  description: 'Move between campaign command and recipient roster without losing delivery context.',
  heading: 'Operations cockpit',
  signedInLabel: 'Signed in'
} as const
