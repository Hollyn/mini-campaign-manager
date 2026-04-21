import { CreateCampaignRequest } from '../api/types'

export const CAMPAIGN_PAGE_SIZE = 8
export const CAMPAIGN_RECIPIENT_PAGE_SIZE = 12
export const CAMPAIGN_SEARCH_DEBOUNCE_MS = 300

export const CAMPAIGN_QUERY_KEYS = {
  all: ['campaigns'] as const,
  detail: (id: string) => ['campaigns', 'detail', id] as const,
  list: (page: number, search: string, status?: string) => ['campaigns', 'list', page, search, status ?? 'all'] as const
} as const

export const campaignDetailRoute = (campaignId: string) => `/campaigns/${campaignId}`
export const campaignEditRoute = (campaignId: string) => `/campaigns/${campaignId}/edit`
export const campaignNewRoute = '/campaigns/new'

export const CAMPAIGN_COPY = {
  actions: {
    back: 'Back to campaigns',
    cancel: 'Cancel',
    confirmDelete: 'Delete campaign',
    create: 'Create campaign',
    createFirst: 'Create your first campaign',
    delete: 'Delete',
    edit: 'Edit draft',
    editInline: 'Edit',
    nextPage: 'Next',
    open: 'Open',
    previousPage: 'Previous',
    save: 'Save changes',
    schedule: 'Schedule',
    send: 'Send now'
  },
  deleteModal: {
    description: 'This draft and its recipient links disappear from workspace right away.',
    eyebrow: 'Campaign removal',
    title: 'Delete this campaign?'
  },
  detail: {
    bodyLabel: 'Message body',
    recipientsLabel: 'Recipient activity',
    scheduleDescription: 'Choose future date and time before this draft moves into scheduled queue.',
    scheduleEyebrow: 'Delivery timing',
    scheduleTitle: 'Schedule campaign',
    sending: 'Sending...'
  },
  empty: {
    description: 'Build first draft, connect audience, then return here to track every campaign lifecycle.',
    title: 'No campaigns yet'
  },
  errors: {
    generic: 'Something went wrong. Please try again.',
    invalidSchedule: 'Choose a future date and time.'
  },
  form: {
    bodyDescription: 'Write final message exactly how recipients should receive it.',
    bodyLabel: 'Message body',
    createDescription: 'Shape draft, connect recipients, and move straight into delivery workflow.',
    createTitle: 'Create campaign',
    editDescription: 'Refine draft copy, audience, and structure before delivery starts.',
    editTitle: 'Edit campaign',
    recipientEmpty: 'No matching recipients yet. Adjust search or create contacts from recipient studio.',
    recipientHelper: 'Search existing recipients by name or email, then build audience set.',
    recipientLabel: 'Recipients',
    searchPlaceholder: 'Search recipients by name or email',
    selectedLabel: 'Selected audience'
  },
  headers: {
    actions: 'Actions',
    createdAt: 'Created',
    name: 'Campaign',
    recipientEmail: 'Email',
    recipientName: 'Recipient',
    recipientOpenedAt: 'Opened',
    recipientSentAt: 'Sent',
    recipientStatus: 'Status',
    recipients: 'Recipients',
    status: 'Status',
    subject: 'Subject'
  },
  helper: {
    debounce: 'Search waits for a pause before refreshing.',
    emptyRecipients: 'No recipients attached yet.',
    pagination: (start: number, end: number, total: number) => `Showing ${start}-${end} of ${total} campaigns`,
    refreshing: 'Refreshing campaigns',
    totalCount: (total: number) => `${total} campaigns in workspace`
  },
  intro: {
    badge: 'Campaign Ledger',
    description: 'Draft, queue, and review every message inside one deliberate control surface.',
    liveTotalLabel: 'Live total',
    title: 'Campaign command'
  },
  list: {
    searchLabel: 'Search campaigns',
    searchPlaceholder: 'Search by name or subject',
    tableDescription: 'Open any row for full delivery detail and actions.',
    tableTitle: 'All campaigns'
  },
  stats: {
    failed: 'Failed',
    openRate: 'Open rate',
    opened: 'Opened',
    recipients: 'Total recipients',
    sendRate: 'Send rate',
    sent: 'Sent'
  },
  statusLabels: {
    draft: 'Draft',
    scheduled: 'Scheduled',
    sending: 'Sending',
    sent: 'Sent'
  },
  states: {
    creating: 'Creating...',
    deleting: 'Deleting...',
    saving: 'Saving...',
    scheduling: 'Scheduling...',
    sending: 'Sending...'
  }
} as const

export const CAMPAIGN_FORM_FIELDS = [
  {
    autoComplete: 'off',
    label: 'Campaign name',
    name: 'name',
    placeholder: 'Summer product reveal',
    type: 'text'
  },
  {
    autoComplete: 'off',
    label: 'Subject line',
    name: 'subject',
    placeholder: 'Meet the campaign your audience should not miss',
    type: 'text'
  }
] as const

export const CAMPAIGN_STATUS_STYLES = {
  draft: 'bg-slate-200 text-slate-700',
  scheduled: 'bg-primary-container text-on-primary-container',
  sending: 'bg-amber-100 text-amber-800',
  sent: 'bg-emerald-100 text-emerald-700'
} as const

export const CAMPAIGN_STATUS_DOT_STYLES = {
  draft: 'bg-slate-500',
  scheduled: 'bg-primary',
  sending: 'bg-amber-500',
  sent: 'bg-emerald-500'
} as const

export const EMPTY_CAMPAIGN_FORM_VALUES: CreateCampaignRequest = {
  body: '',
  name: '',
  recipientIds: [],
  subject: ''
}
