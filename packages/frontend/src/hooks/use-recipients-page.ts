import { ChangeEvent, FormEvent, useMemo, useState } from 'react'

import { Recipient } from '../api/types'
import { DATA_TABLE_PAGE_SIZE_OPTIONS, DATA_TABLE_SEARCH_DEBOUNCE_MS } from '../constants/datatable'
import { EMPTY_RECIPIENT_FORM_VALUES, RECIPIENT_COPY, RECIPIENT_DEFAULT_SORT } from '../constants/recipients'
import { toggleSort } from '../lib/data-table'
import { getRequestErrorMessage } from '../lib/request-error'
import { useDebouncedValue } from './use-debounced-value'
import { useCreateRecipient } from './use-create-recipient'
import { useDeleteRecipient } from './use-delete-recipient'
import { useRecipients } from './use-recipients'
import { useUpdateRecipient } from './use-update-recipient'

type FormMode = 'create' | 'edit'

const toRecipientFormValues = (recipient: Recipient | null) => ({
  email: recipient?.email ?? EMPTY_RECIPIENT_FORM_VALUES.email,
  name: recipient?.name ?? EMPTY_RECIPIENT_FORM_VALUES.name
})

export const useRecipientsPage = () => {
  const [activePage, setActivePage] = useState(1)
  const [activeRecipient, setActiveRecipient] = useState<Recipient | null>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<Recipient | null>(null)
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formValues, setFormValues] = useState(EMPTY_RECIPIENT_FORM_VALUES)
  const [pageSize, setPageSize] = useState<number>(DATA_TABLE_PAGE_SIZE_OPTIONS[0])
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState<typeof RECIPIENT_DEFAULT_SORT.field>(RECIPIENT_DEFAULT_SORT.field)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(RECIPIENT_DEFAULT_SORT.direction)
  const debouncedSearch = useDebouncedValue(search, DATA_TABLE_SEARCH_DEBOUNCE_MS)

  const recipientsQuery = useRecipients(activePage, pageSize, debouncedSearch, sortBy, sortDirection)

  const createMutation = useCreateRecipient({
    onSuccess: async () => {
      setActivePage(1)
      closeForm()
    }
  })

  const updateMutation = useUpdateRecipient({
    onSuccess: async () => {
      closeForm()
    }
  })

  const deleteMutation = useDeleteRecipient({
    onSuccess: async () => {
      const currentLength = recipientsQuery.data?.recipients.length ?? 0

      if (activePage > 1 && currentLength === 1) {
        setActivePage((currentPage) => currentPage - 1)
      }

      closeDeleteModal()
    }
  })

  const closeForm = () => {
    createMutation.reset()
    updateMutation.reset()
    setActiveRecipient(null)
    setFormMode('create')
    setFormValues(EMPTY_RECIPIENT_FORM_VALUES)
    setIsFormOpen(false)
  }

  const closeDeleteModal = () => {
    deleteMutation.reset()
    setDeleteCandidate(null)
  }

  const openCreateModal = () => {
    createMutation.reset()
    updateMutation.reset()
    setActiveRecipient(null)
    setFormMode('create')
    setFormValues(EMPTY_RECIPIENT_FORM_VALUES)
    setIsFormOpen(true)
  }

  const openEditModal = (recipient: Recipient) => {
    createMutation.reset()
    updateMutation.reset()
    setActiveRecipient(recipient)
    setFormMode('edit')
    setFormValues(toRecipientFormValues(recipient))
    setIsFormOpen(true)
  }

  const openDeleteModal = (recipient: Recipient) => {
    deleteMutation.reset()
    setDeleteCandidate(recipient)
  }

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }))
  }

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formMode === 'edit' && activeRecipient) {
      updateMutation.mutate({
        id: activeRecipient.id,
        payload: formValues
      })

      return
    }

    createMutation.mutate(formValues)
  }

  const handleDeleteConfirm = () => {
    if (!deleteCandidate) {
      return
    }

    deleteMutation.mutate(deleteCandidate.id)
  }

  const handleNextPage = () => {
    const totalPages = recipientsQuery.data?.pagination.totalPages ?? 0

    setActivePage((currentPage) => (currentPage >= totalPages ? currentPage : currentPage + 1))
  }

  const handlePreviousPage = () => {
    setActivePage((currentPage) => (currentPage <= 1 ? currentPage : currentPage - 1))
  }

  const handlePageChange = (page: number) => {
    const totalPages = recipientsQuery.data?.pagination.totalPages ?? 0

    if (totalPages === 0) {
      setActivePage(1)
      return
    }

    setActivePage(Math.min(Math.max(page, 1), totalPages))
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setActivePage(1)
  }

  const handlePageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setActivePage(1)
  }

  const handleSortChange = (nextSortBy: typeof sortBy) => {
    const nextSort = toggleSort(sortBy, sortDirection, nextSortBy)
    setSortBy(nextSort.field)
    setSortDirection(nextSort.direction)
    setActivePage(1)
  }

  const pageErrorMessage = useMemo(() => {
    if (!recipientsQuery.error) {
      return null
    }

    return getRequestErrorMessage(recipientsQuery.error, RECIPIENT_COPY.errors.generic)
  }, [recipientsQuery.error])

  const formErrorMessage = useMemo(() => {
    const activeError = formMode === 'edit' ? updateMutation.error : createMutation.error

    if (!activeError) {
      return null
    }

    return getRequestErrorMessage(activeError, RECIPIENT_COPY.errors.generic)
  }, [createMutation.error, formMode, updateMutation.error])

  const deleteErrorMessage = useMemo(() => {
    if (!deleteMutation.error) {
      return null
    }

    return getRequestErrorMessage(deleteMutation.error, RECIPIENT_COPY.errors.generic)
  }, [deleteMutation.error])

  const isSubmitting = formMode === 'edit' ? updateMutation.isPending : createMutation.isPending
  const pagination = recipientsQuery.data?.pagination ?? null
  const recipients = recipientsQuery.data?.recipients ?? []

  return {
    deleteCandidate,
    deleteErrorMessage,
    formErrorMessage,
    formMode,
    formValues,
    handleDeleteConfirm,
    handleFormChange,
    handleFormSubmit,
    handleNextPage,
    handlePageChange,
    handlePageSizeChange,
    handlePreviousPage,
    handleSearchChange,
    handleSortChange,
    isDeleteOpen: Boolean(deleteCandidate),
    isDeleting: deleteMutation.isPending,
    isFormOpen,
    isLoading: recipientsQuery.isPending,
    isRefetching: recipientsQuery.isFetching,
    isSubmitting,
    openCreateModal,
    openDeleteModal,
    openEditModal,
    pageErrorMessage,
    pageSize,
    pagination,
    recipients,
    search,
    sortBy,
    sortDirection,
    totalRecipients: pagination?.total ?? 0,
    closeDeleteModal,
    closeForm
  }
}
