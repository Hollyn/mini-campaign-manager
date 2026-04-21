export const CAMPAIGN_MESSAGES = {
  alreadySendingOrSent: 'Campaign already sent or sending',
  draftOnlyDelete: 'Only draft campaigns can be deleted',
  draftOnlyEdit: 'Only draft campaigns can be edited',
  draftOnlySchedule: 'Only draft campaigns can be scheduled',
  notFound: 'Campaign not found',
  recipientsMissing: 'One or more recipients were not found',
  scheduleMustBeFuture: 'Scheduled time must be in the future',
  sendStarted: 'Send started'
} as const

export const CAMPAIGN_PAGINATION = {
  defaultLimit: 8,
  maxLimit: 20,
  minPage: 1
} as const

export const CAMPAIGN_SEND = {
  failureThreshold: 0.2,
  maxDelayMs: 100,
  minDelayMs: 50,
  openThreshold: 0.5
} as const
