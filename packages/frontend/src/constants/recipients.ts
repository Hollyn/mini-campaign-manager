import { CreateRecipientRequest } from '../api/types'

export const RECIPIENT_PAGE_SIZE = 8

export const RECIPIENT_QUERY_KEYS = {
  all: ['recipients'] as const,
  list: (page: number) => ['recipients', 'list', page] as const
} as const

export const RECIPIENT_COPY = {
  actions: {
    add: 'Add recipient',
    cancel: 'Cancel',
    close: 'Close',
    delete: 'Delete',
    edit: 'Edit',
    nextPage: 'Next',
    previousPage: 'Previous',
    save: 'Save changes'
  },
  deleteModal: {
    description: 'This removes recipient from future sends. Existing campaign links will be cleared too.',
    eyebrow: 'Recipient flow',
    title: 'Delete recipient?'
  },
  empty: {
    description: 'Build contact list before linking people to campaigns.',
    title: 'No recipients yet'
  },
  errors: {
    generic: 'Something went wrong. Please try again.'
  },
  form: {
    createDescription: 'Add contact details now. You can update them later.',
    eyebrow: 'Recipient flow',
    createTitle: 'Add recipient',
    editDescription: 'Update recipient details for upcoming campaigns.',
    editTitle: 'Edit recipient'
  },
  headers: {
    actions: 'Actions',
    email: 'Email',
    name: 'Name'
  },
  helper: {
    pagination: (start: number, end: number, total: number) => `Showing ${start}-${end} of ${total} recipients`,
    refreshing: 'Refreshing page',
    totalCount: (total: number) => `${total} total recipients`
  },
  intro: {
    badge: 'Recipient Studio',
    description: 'Shape clean contact lists for campaign drafting, scheduling, and send workflows.',
    liveTotalLabel: 'Live total',
    title: 'Recipient management'
  },
  row: {
    eyebrow: 'Contact record'
  },
  states: {
    creating: 'Creating...',
    deleting: 'Deleting...',
    saving: 'Saving...'
  }
} as const

export const RECIPIENT_FORM_FIELDS = [
  {
    autoComplete: 'name',
    label: 'Name',
    name: 'name',
    placeholder: 'Alex Curator',
    type: 'text'
  },
  {
    autoComplete: 'email',
    label: 'Email',
    name: 'email',
    placeholder: 'alex@example.com',
    type: 'email'
  }
] as const

export const EMPTY_RECIPIENT_FORM_VALUES: CreateRecipientRequest = {
  email: '',
  name: ''
}
