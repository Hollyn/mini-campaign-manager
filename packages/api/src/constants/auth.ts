export const AUTH_MESSAGES = {
  emailInUse: 'User with this email already exists',
  invalidCredentials: 'Invalid email or password',
  sessionInvalid: 'Authentication required'
} as const

export const AUTH_NUMBERS = {
  bcryptSaltRounds: 10,
  maxPasswordLength: 72,
  minNameLength: 2,
  minPasswordLength: 8,
  maxNameLength: 100
} as const

export const SESSION_COOKIE_NAME = 'campaign_session'
