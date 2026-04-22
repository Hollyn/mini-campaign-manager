export const DATA_TABLE_PAGE_SIZE_OPTIONS = [8, 12, 20] as const
export const DATA_TABLE_SEARCH_DEBOUNCE_MS = 300

export const DATA_TABLE_COPY = {
  actions: {
    next: 'Next page',
    previous: 'Previous page'
  },
  empty: {
    noResults: 'No results found.'
  },
  labels: {
    page: (page: number) => `Go to page ${page}`,
    rows: 'Rows',
    search: 'Search'
  },
  states: {
    refreshing: 'Refreshing'
  }
} as const
