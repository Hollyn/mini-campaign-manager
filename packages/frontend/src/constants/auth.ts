export const AUTH_ROUTES = {
  campaigns: '/campaigns',
  login: '/login',
  recipients: '/recipients',
  register: '/register',
  root: '/'
} as const

export const AUTH_QUERY_KEYS = {
  session: ['auth', 'session'] as const
} as const

export const AUTH_COPY = {
  bootstrap: {
    cta: 'Retry session check',
    description: 'Connection to workspace could not be confirmed. Retry session check to continue.',
    eyebrow: 'Session bootstrap',
    loadingDescription: 'Reconnecting to your workspace session and preparing guarded routes.',
    loadingTitle: 'Restoring workspace session',
    title: 'Workspace session unavailable'
  },
  eyebrow: 'Mini Campaign Manager',
  genericError: 'Something went wrong. Please try again.',
  login: {
    alternateActionLabel: 'Create account',
    alternatePrompt: 'Need a fresh workspace?',
    description: 'Step back into your campaigns without fighting the interface.',
    footerHint: 'Draft. Schedule. Send.',
    pendingLabel: 'Logging in...',
    submitLabel: 'Log in',
    title: 'Back to the control room'
  },
  logout: {
    label: 'Sign out',
    pendingLabel: 'Signing out...'
  },
  register: {
    alternateActionLabel: 'Back to login',
    alternatePrompt: 'Already inside?',
    description: 'Open a clean workspace for campaigns that feel deliberate from first draft to final send.',
    footerHint: 'Less clutter. More signal.',
    pendingLabel: 'Creating account...',
    submitLabel: 'Create account',
    title: 'Start with a clear desk'
  },
  workspace: {
    badges: ['Session ready', 'Guarded routes', 'Auth phase complete'] as const,
    description:
      'Authentication now protects workspace entry. Campaign creation, delivery, and reporting will plug into this secured shell in later phases.',
    eyebrow: 'Authenticated workspace',
    heading: 'Campaign workspace secured',
    metadataLabel: 'Next milestone',
    metadataValue: 'Campaign CRUD',
    welcomePrefix: 'Signed in as'
  }
} as const

export const AUTH_FORM_FIELDS = {
  login: [
    {
      autoComplete: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
      type: 'email'
    },
    {
      autoComplete: 'current-password',
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      type: 'password'
    }
  ],
  register: [
    {
      autoComplete: 'name',
      label: 'Full name',
      name: 'name',
      placeholder: 'Full name',
      type: 'text'
    },
    {
      autoComplete: 'email',
      label: 'Email',
      name: 'email',
      placeholder: 'Email',
      type: 'email'
    },
    {
      autoComplete: 'new-password',
      label: 'Password',
      name: 'password',
      placeholder: 'Password',
      type: 'password'
    }
  ]
} as const
