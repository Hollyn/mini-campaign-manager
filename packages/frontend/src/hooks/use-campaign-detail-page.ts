import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { CampaignRecipientActivity, CampaignRecipientListSortBy, CampaignStatus } from '../api/types'
import {
  CAMPAIGN_COPY,
  CAMPAIGN_RECIPIENT_DEFAULT_SORT,
  campaignEditRoute,
  CampaignRecipientActivityFilter
} from '../constants/campaigns'
import { DATA_TABLE_PAGE_SIZE_OPTIONS } from '../constants/datatable'
import { createPaginationMeta, toggleSort } from '../lib/data-table'
import { getRequestErrorMessage } from '../lib/request-error'
import { useCampaign } from './use-campaign'
import { useDeleteCampaign } from './use-delete-campaign'
import { useScheduleCampaign } from './use-schedule-campaign'
import { useSendCampaign } from './use-send-campaign'

const toDateTimeLocalValue = (value: string | null) => {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const timezoneOffset = date.getTimezoneOffset() * 60_000

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16)
}

const getCurrentDateTimeLocalValue = () => toDateTimeLocalValue(new Date().toISOString())

const toActionState = (status: CampaignStatus, isSendStarting: boolean): CampaignStatus => {
  if (isSendStarting && (status === 'draft' || status === 'scheduled')) {
    return 'sending'
  }

  return status
}

const compareText = (left: string, right: string) => left.localeCompare(right, undefined, { sensitivity: 'base' })

const compareDateTime = (left: string | null, right: string | null) => {
  if (!left && !right) {
    return 0
  }

  if (!left) {
    return 1
  }

  if (!right) {
    return -1
  }

  return new Date(left).getTime() - new Date(right).getTime()
}

const filterRecipients = (
  recipients: CampaignRecipientActivity[],
  recipientFilter: CampaignRecipientActivityFilter
) => {
  switch (recipientFilter) {
    case 'failed':
      return recipients.filter((recipient) => recipient.status === 'failed')
    case 'opened':
      return recipients.filter((recipient) => recipient.openedAt !== null)
    case 'sent':
      return recipients.filter((recipient) => recipient.status === 'sent')
    default:
      return recipients
  }
}

const sortRecipients = (
  recipients: CampaignRecipientActivity[],
  sortBy: CampaignRecipientListSortBy,
  sortDirection: 'asc' | 'desc'
) => {
  const direction = sortDirection === 'asc' ? 1 : -1

  return [...recipients].sort((left, right) => {
    let result = 0

    switch (sortBy) {
      case 'email':
        result = compareText(left.email, right.email)
        break
      case 'openedAt':
        result = compareDateTime(left.openedAt, right.openedAt)
        break
      case 'sentAt':
        result = compareDateTime(left.sentAt, right.sentAt)
        break
      case 'status':
        result = compareText(left.status, right.status)
        break
      default:
        result = compareText(left.name, right.name)
        break
    }

    return result * direction
  })
}

export const useCampaignDetailPage = (campaignId: string) => {
  const navigate = useNavigate()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [isSendStarting, setIsSendStarting] = useState(false)
  const [minScheduleValue, setMinScheduleValue] = useState(getCurrentDateTimeLocalValue())
  const [scheduleValue, setScheduleValue] = useState('')
  const [scheduleClientError, setScheduleClientError] = useState<string | null>(null)
  const [recipientPage, setRecipientPage] = useState(1)
  const [recipientPageSize, setRecipientPageSize] = useState<number>(DATA_TABLE_PAGE_SIZE_OPTIONS[0])
  const [recipientFilter, setRecipientFilter] = useState<CampaignRecipientActivityFilter>('all')
  const [recipientSearch, setRecipientSearch] = useState('')
  const [recipientSortBy, setRecipientSortBy] = useState<typeof CAMPAIGN_RECIPIENT_DEFAULT_SORT.field>(CAMPAIGN_RECIPIENT_DEFAULT_SORT.field)
  const [recipientSortDirection, setRecipientSortDirection] = useState<'asc' | 'desc'>(CAMPAIGN_RECIPIENT_DEFAULT_SORT.direction)
  const [isBodyExpanded, setIsBodyExpanded] = useState(false)

  const campaignQuery = useCampaign(campaignId, (data) => (data?.campaign.status === 'sending' ? 2000 : false))
  const campaignStatus = campaignQuery.data?.campaign.status ?? 'draft'
  const actionState = useMemo(() => toActionState(campaignStatus, isSendStarting), [campaignStatus, isSendStarting])

  const deleteMutation = useDeleteCampaign({
    onSuccess: async () => {
      navigate('/campaigns', { replace: true })
    }
  })

  const scheduleMutation = useScheduleCampaign({
    onSuccess: async () => {
      setIsScheduleOpen(false)
      setScheduleClientError(null)
    }
  })

  const sendMutation = useSendCampaign({
    onError: async () => {
      setIsSendStarting(false)
    }
  })

  useEffect(() => {
    if (campaignStatus === 'sending' || campaignStatus === 'sent') {
      setIsSendStarting(false)
    }
  }, [campaignStatus])

  const pageErrorMessage = useMemo(() => {
    if (!campaignQuery.error) {
      return null
    }

    return getRequestErrorMessage(campaignQuery.error, CAMPAIGN_COPY.errors.generic)
  }, [campaignQuery.error])

  const deleteErrorMessage = useMemo(() => {
    if (!deleteMutation.error) {
      return null
    }

    return getRequestErrorMessage(deleteMutation.error, CAMPAIGN_COPY.errors.generic)
  }, [deleteMutation.error])

  const scheduleErrorMessage = useMemo(() => {
    if (scheduleClientError) {
      return scheduleClientError
    }

    if (!scheduleMutation.error) {
      return null
    }

    return getRequestErrorMessage(scheduleMutation.error, CAMPAIGN_COPY.errors.generic)
  }, [scheduleClientError, scheduleMutation.error])

  const sendErrorMessage = useMemo(() => {
    if (!sendMutation.error) {
      return null
    }

    return getRequestErrorMessage(sendMutation.error, CAMPAIGN_COPY.errors.generic)
  }, [sendMutation.error])

  const recipientSource = campaignQuery.data?.recipients ?? []

  const recipientFilterOptions = useMemo(
    () => [
      {
        count: recipientSource.length,
        label: CAMPAIGN_COPY.detail.recipientFilters.all,
        value: 'all' as const
      },
      {
        count: recipientSource.filter((recipient) => recipient.status === 'sent').length,
        label: CAMPAIGN_COPY.detail.recipientFilters.sent,
        value: 'sent' as const
      },
      {
        count: recipientSource.filter((recipient) => recipient.status === 'failed').length,
        label: CAMPAIGN_COPY.detail.recipientFilters.failed,
        value: 'failed' as const
      },
      {
        count: recipientSource.filter((recipient) => recipient.openedAt !== null).length,
        label: CAMPAIGN_COPY.detail.recipientFilters.opened,
        value: 'opened' as const
      }
    ],
    [recipientSource]
  )

  const recipientsByFilter = useMemo(
    () => filterRecipients(recipientSource, recipientFilter),
    [recipientFilter, recipientSource]
  )

  const filteredRecipients = useMemo(() => {
    const normalizedSearch = recipientSearch.trim().toLowerCase()

    if (normalizedSearch.length === 0) {
      return recipientsByFilter
    }

    return recipientsByFilter.filter((recipient) => {
      const sentAt = recipient.sentAt ?? ''
      const openedAt = recipient.openedAt ?? ''

      return [recipient.name, recipient.email, recipient.status, sentAt, openedAt]
        .join(' ')
        .toLowerCase()
        .includes(normalizedSearch)
    })
  }, [recipientSearch, recipientsByFilter])

  const sortedRecipients = useMemo(
    () => sortRecipients(filteredRecipients, recipientSortBy, recipientSortDirection),
    [filteredRecipients, recipientSortBy, recipientSortDirection]
  )

  const recipientPagination = useMemo(
    () => createPaginationMeta(recipientPage, recipientPageSize, sortedRecipients.length),
    [recipientPage, recipientPageSize, sortedRecipients.length]
  )

  const pagedRecipients = useMemo(() => {
    const startIndex = (recipientPage - 1) * recipientPageSize
    return sortedRecipients.slice(startIndex, startIndex + recipientPageSize)
  }, [recipientPage, recipientPageSize, sortedRecipients])

  useEffect(() => {
    const totalPages = recipientPagination.totalPages

    if (totalPages === 0) {
      setRecipientPage(1)
      return
    }

    if (recipientPage > totalPages) {
      setRecipientPage(totalPages)
    }
  }, [recipientPage, recipientPagination.totalPages])

  const openDeleteModal = () => {
    deleteMutation.reset()
    setIsDeleteOpen(true)
  }

  const openScheduleModal = () => {
    scheduleMutation.reset()
    setScheduleClientError(null)
    setMinScheduleValue(getCurrentDateTimeLocalValue())
    setScheduleValue(toDateTimeLocalValue(campaignQuery.data?.campaign.scheduledAt ?? null))
    setIsScheduleOpen(true)
  }

  const handleScheduleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!scheduleValue) {
      setScheduleClientError(CAMPAIGN_COPY.errors.invalidSchedule)
      return
    }

    const scheduledDate = new Date(scheduleValue)

    if (scheduledDate.getTime() <= Date.now()) {
      setScheduleClientError(CAMPAIGN_COPY.errors.invalidSchedule)
      return
    }

    setScheduleClientError(null)
    scheduleMutation.mutate({
      id: campaignId,
      payload: {
        scheduled_at: scheduledDate.toISOString()
      }
    })
  }

  const handleSend = () => {
    if (campaignId.length === 0) {
      return
    }

    sendMutation.reset()
    setIsSendStarting(true)
    sendMutation.mutate(campaignId)
  }

  const handleRecipientSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRecipientSearch(event.target.value)
    setRecipientPage(1)
  }

  const handleRecipientFilterChange = (value: CampaignRecipientActivityFilter) => {
    setRecipientFilter(value)
    setRecipientPage(1)
  }

  const handleRecipientPageSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setRecipientPageSize(Number(event.target.value))
    setRecipientPage(1)
  }

  const handleRecipientSortChange = (nextSortBy: CampaignRecipientListSortBy) => {
    const nextSort = toggleSort(recipientSortBy, recipientSortDirection, nextSortBy)
    setRecipientSortBy(nextSort.field)
    setRecipientSortDirection(nextSort.direction)
    setRecipientPage(1)
  }

  const handleRecipientNextPage = () => {
    setRecipientPage((currentPage) =>
      currentPage >= recipientPagination.totalPages ? currentPage : currentPage + 1
    )
  }

  const handleRecipientPreviousPage = () => {
    setRecipientPage((currentPage) => (currentPage <= 1 ? currentPage : currentPage - 1))
  }

  const handleRecipientPageChange = (page: number) => {
    const totalPages = recipientPagination.totalPages

    if (totalPages === 0) {
      setRecipientPage(1)
      return
    }

    setRecipientPage(Math.min(Math.max(page, 1), totalPages))
  }

  return {
    canEdit: actionState === 'draft',
    canDelete: actionState === 'draft',
    canSchedule: actionState === 'draft',
    canSend: actionState === 'draft' || actionState === 'scheduled',
    campaign: campaignQuery.data?.campaign ?? null,
    closeDeleteModal: () => setIsDeleteOpen(false),
    closeScheduleModal: () => setIsScheduleOpen(false),
    deleteErrorMessage,
    handleDeleteConfirm: () => deleteMutation.mutate(campaignId),
    handleRecipientNextPage,
    handleRecipientFilterChange,
    handleRecipientPageChange,
    handleRecipientPageSizeChange,
    handleRecipientPreviousPage,
    handleRecipientSearchChange,
    handleRecipientSortChange,
    handleScheduleChange: (value: string) => setScheduleValue(value),
    handleScheduleSubmit,
    handleSend,
    isBodyExpanded,
    isDeleteOpen,
    isDeleting: deleteMutation.isPending,
    isLoading: campaignQuery.isPending,
    isRefetching: campaignQuery.isFetching,
    isScheduleOpen,
    isScheduling: scheduleMutation.isPending,
    isSending: actionState === 'sending',
    minScheduleValue,
    onBack: () => navigate('/campaigns'),
    onEdit: () => navigate(campaignEditRoute(campaignId)),
    openDeleteModal,
    openScheduleModal,
    pageErrorMessage,
    recipientFilter,
    recipientFilterOptions,
    recipientPageSize,
    recipientPagination,
    recipientSearch,
    recipientSortBy,
    recipientSortDirection,
    recipients: pagedRecipients,
    scheduleErrorMessage,
    scheduleValue,
    sendErrorMessage,
    status: actionState,
    stats: campaignQuery.data?.stats ?? null,
    toggleBodyExpanded: () => setIsBodyExpanded((currentValue) => !currentValue),
    totalRecipients: recipientSource.length,
    visibleRecipientCount: sortedRecipients.length
  }
}
