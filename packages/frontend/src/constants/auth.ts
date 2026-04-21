export const AUTH_ROUTES = {
  campaigns: '/campaigns',
  login: '/login',
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
    title: 'Workspace session unavailable'
  },
  genericError: 'Something went wrong. Please try again.',
  hero: {
    badge: 'Precision Editor',
    intro:
      'Secure session, typed auth contract, and guarded routes now shape campaign workspace before campaign tools arrive.',
    items: ['HTTP-only JWT cookie', 'Session restore on refresh', 'Editorial auth screens'] as const,
    title: 'Enter workspace built for deliberate campaign work.'
  },
  login: {
    alternateActionLabel: 'Request access',
    alternatePrompt: 'New to platform?',
    description: 'Enter credentials to continue to workspace.',
    footerHint: 'Your session stays active while secure cookie remains valid.',
    pendingLabel: 'Authenticating...',
    submitLabel: 'Authenticate',
    title: 'Access Editor'
  },
  logout: {
    label: 'Sign out',
    pendingLabel: 'Signing out...'
  },
  register: {
    alternateActionLabel: 'Back to login',
    alternatePrompt: 'Already have access?',
    description: 'Create account to begin drafting and scheduling campaigns.',
    footerHint: 'Registration signs you in immediately with secure session cookie.',
    pendingLabel: 'Creating account...',
    submitLabel: 'Create account',
    title: 'Request Workspace'
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
      label: 'Email Address',
      name: 'email',
      placeholder: 'name@example.com',
      type: 'email'
    },
    {
      autoComplete: 'current-password',
      label: 'Password',
      name: 'password',
      placeholder: 'Enter your password',
      type: 'password'
    }
  ],
  register: [
    {
      autoComplete: 'name',
      label: 'Full Name',
      name: 'name',
      placeholder: 'Alex Curator',
      type: 'text'
    },
    {
      autoComplete: 'email',
      label: 'Email Address',
      name: 'email',
      placeholder: 'name@example.com',
      type: 'email'
    },
    {
      autoComplete: 'new-password',
      label: 'Password',
      name: 'password',
      placeholder: 'Create a secure password',
      type: 'password'
    }
  ]
} as const
