import { CampaignListSortBy, CampaignRecipientListSortBy, CreateCampaignRequest } from '../api/types'

export const campaignRecipientActivityFilters = ['all', 'sent', 'failed', 'opened'] as const

export type CampaignRecipientActivityFilter = (typeof campaignRecipientActivityFilters)[number]

export const CAMPAIGN_PAGE_SIZE = 8
export const CAMPAIGN_RECIPIENT_PAGE_SIZE = 12
export const CAMPAIGN_SEARCH_DEBOUNCE_MS = 300

export const CAMPAIGN_DEFAULT_SORT = {
  direction: 'desc' as const,
  field: 'createdAt' as CampaignListSortBy
}

export const CAMPAIGN_RECIPIENT_DEFAULT_SORT = {
  direction: 'asc' as const,
  field: 'name' as CampaignRecipientListSortBy
}

export const CAMPAIGN_QUERY_KEYS = {
  all: ['campaigns'] as const,
  detail: (id: string) => ['campaigns', 'detail', id] as const,
  list: (page: number, limit: number, search: string, sortBy: string, sortOrder: string, status?: string) =>
    ['campaigns', 'list', page, limit, search, sortBy, sortOrder, status ?? 'all'] as const
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
    open: 'Open',
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
    fields: {
      audience: 'Audience',
      created: 'Created',
      scheduled: 'Scheduled',
      status: 'Status',
      subject: 'Subject',
      title: 'Title',
      updated: 'Updated'
    },
    bodyLabel: 'Message body',
    collapseBody: 'Show less',
    expandBody: 'Show full message',
    infoTitle: 'Campaign',
    recipientsLabel: 'Recipient activity',
    recipientSearchPlaceholder: 'Search recipients',
    recipientSummary: (total: number) => `${total} recipients`,
    recipientViewSummary: (visible: number, total: number) => `${visible} of ${total} recipients in view`,
    recipientFilters: {
      all: 'All',
      failed: 'Failed',
      opened: 'Opened',
      sent: 'Sent'
    },
    recipientsEmpty: 'No recipients match this view.',
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
    bodyPaneTitle: 'Body',
    campaignPaneTitle: 'Campaign',
    bodyLabel: 'Message body',
    bodyPlaceholder: 'Write campaign copy here',
    createRecipient: 'Create recipient',
    createRecipientPending: 'Creating recipient...',
    createRecipientSummary: (email: string, name: string) => `Add ${email} as ${name} and attach it to this campaign.`,
    createTitle: 'Create campaign',
    editorActions: {
      bold: 'Bold',
      bulletList: 'Bullets',
      heading: 'Heading',
      italic: 'Italic',
      orderedList: 'Numbering',
      quote: 'Quote',
      underline: 'Underline'
    },
    editTitle: 'Edit campaign',
    recipientPaneTitle: 'Recipients',
    recipientEmpty: 'No matching recipients yet. Adjust search or create contacts from recipient studio.',
    recipientLabel: 'Recipients',
    recipientNameFallback: 'New Recipient',
    searchPlaceholder: 'Search recipients by name or email',
    selectedCount: (count: number) => `${count} selected`,
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
    emptyRecipients: 'No recipients attached yet.',
    pagination: (start: number, end: number, total: number) => `Showing ${start}-${end} of ${total} campaigns`,
    recipientPagination: (start: number, end: number, total: number) => `Showing ${start}-${end} of ${total} recipients`,
    totalCount: (total: number) => `${total} campaigns`
  },
  list: {
    empty: 'No campaigns match this view.',
    sortByLabel: 'Sort by',
    searchLabel: 'Search campaigns',
    searchPlaceholder: 'Search by name or subject'
  },
  stats: {
    failed: 'Failed',
    received: 'Received',
    openRate: 'Open rate',
    opened: 'Opened',
    recipients: 'Total recipients',
    sendRate: 'Send rate',
    sent: 'Sent',
    total: 'Total'
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
  scheduled: 'bg-blue-100 text-blue-800',
  sending: 'bg-amber-100 text-amber-800',
  sent: 'bg-emerald-100 text-emerald-700'
} as const

export const CAMPAIGN_STATUS_DOT_STYLES = {
  draft: 'bg-slate-500',
  scheduled: 'bg-blue-500',
  sending: 'bg-amber-500',
  sent: 'bg-emerald-500'
} as const

export const EMPTY_CAMPAIGN_FORM_VALUES: CreateCampaignRequest = {
  body: '',
  name: '',
  recipientIds: [],
  subject: ''
}
