import { FormEvent, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { CAMPAIGN_COPY, campaignEditRoute } from '../constants/campaigns'
import { useCampaign } from './use-campaign'
import { useDeleteCampaign } from './use-delete-campaign'
import { useScheduleCampaign } from './use-schedule-campaign'
import { useSendCampaign } from './use-send-campaign'
import { getRequestErrorMessage } from '../lib/request-error'

const toDateTimeLocalValue = (value: string | null) => {
  if (!value) {
    return ''
  }

  const date = new Date(value)
  const timezoneOffset = date.getTimezoneOffset() * 60_000

  return new Date(date.getTime() - timezoneOffset).toISOString().slice(0, 16)
}

export const useCampaignDetailPage = (campaignId: string) => {
  const navigate = useNavigate()
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [scheduleValue, setScheduleValue] = useState('')
  const [scheduleClientError, setScheduleClientError] = useState<string | null>(null)

  const campaignQuery = useCampaign(campaignId, (data) => (data?.campaign.status === 'sending' ? 2000 : false))

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

  const sendMutation = useSendCampaign()

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

  const openDeleteModal = () => {
    deleteMutation.reset()
    setIsDeleteOpen(true)
  }

  const openScheduleModal = () => {
    scheduleMutation.reset()
    setScheduleClientError(null)
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

  return {
    campaign: campaignQuery.data?.campaign ?? null,
    closeDeleteModal: () => setIsDeleteOpen(false),
    closeScheduleModal: () => setIsScheduleOpen(false),
    deleteErrorMessage,
    handleDeleteConfirm: () => deleteMutation.mutate(campaignId),
    handleScheduleChange: (value: string) => setScheduleValue(value),
    handleScheduleSubmit,
    handleSend: () => sendMutation.mutate(campaignId),
    isDeleteOpen,
    isDeleting: deleteMutation.isPending,
    isLoading: campaignQuery.isPending,
    isRefetching: campaignQuery.isFetching,
    isScheduleOpen,
    isScheduling: scheduleMutation.isPending,
    isSending: sendMutation.isPending,
    onBack: () => navigate('/campaigns'),
    onEdit: () => navigate(campaignEditRoute(campaignId)),
    openDeleteModal,
    openScheduleModal,
    pageErrorMessage,
    recipients: campaignQuery.data?.recipients ?? [],
    scheduleErrorMessage,
    scheduleValue,
    sendErrorMessage,
    status: campaignQuery.data?.campaign.status ?? 'draft',
    stats: campaignQuery.data?.stats ?? null
  }
}
