import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Recipient } from '../api/types'
import {
  CAMPAIGN_COPY,
  CAMPAIGN_SEARCH_DEBOUNCE_MS,
  EMPTY_CAMPAIGN_FORM_VALUES,
  campaignDetailRoute
} from '../constants/campaigns'
import { useDebouncedValue } from './use-debounced-value'
import { useCampaign } from './use-campaign'
import { useCreateCampaign } from './use-create-campaign'
import { useCreateRecipient } from './use-create-recipient'
import { useRecipientOptions } from './use-recipient-options'
import { useUpdateCampaign } from './use-update-campaign'
import { getRequestErrorMessage, getRequestFieldErrors } from '../lib/request-error'

type CampaignFormMode = 'create' | 'edit'
const campaignFormFields = ['body', 'name', 'recipientIds', 'subject'] as const
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const toSelectedRecipient = (recipient: Recipient) => ({
  email: recipient.email,
  id: recipient.id,
  name: recipient.name
})

const toRecipientNameFromEmail = (email: string) => {
  const localPart = email.split('@')[0] ?? ''
  const words = localPart
    .split(/[._-]+/)
    .map((word) => word.trim())
    .filter((word) => word.length > 0)
    .map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`)

  return words.length > 0 ? words.join(' ') : CAMPAIGN_COPY.form.recipientNameFallback
}

export const useCampaignFormPage = (campaignId?: string) => {
  const navigate = useNavigate()
  const mode: CampaignFormMode = campaignId ? 'edit' : 'create'
  const [isHydrated, setIsHydrated] = useState(mode === 'create')
  const [formValues, setFormValues] = useState(EMPTY_CAMPAIGN_FORM_VALUES)
  const [recipientSearch, setRecipientSearch] = useState('')
  const [selectedRecipients, setSelectedRecipients] = useState<Array<{ email: string; id: string; name: string }>>([])
  const debouncedRecipientSearch = useDebouncedValue(recipientSearch, CAMPAIGN_SEARCH_DEBOUNCE_MS)

  const campaignQuery = useCampaign(campaignId ?? '', false)
  const recipientOptionsQuery = useRecipientOptions(debouncedRecipientSearch)

  const createMutation = useCreateCampaign({
    onSuccess: async (response) => {
      navigate(campaignDetailRoute(response.campaign.id), { replace: true })
    }
  })
  const createRecipientMutation = useCreateRecipient({
    onSuccess: async ({ recipient }) => {
      const nextRecipient = toSelectedRecipient(recipient)

      setSelectedRecipients((currentRecipients) => {
        const hasRecipient = currentRecipients.some((currentRecipient) => currentRecipient.id === nextRecipient.id)
        const nextRecipients = hasRecipient ? currentRecipients : [...currentRecipients, nextRecipient]

        setFormValues((currentValues) => ({
          ...currentValues,
          recipientIds: nextRecipients.map((currentRecipient) => currentRecipient.id)
        }))

        return nextRecipients
      })

      setRecipientSearch('')
    }
  })

  const updateMutation = useUpdateCampaign({
    onSuccess: async (response) => {
      navigate(campaignDetailRoute(response.campaign.id), { replace: true })
    }
  })

  useEffect(() => {
    if (mode !== 'edit' || !campaignQuery.data || isHydrated) {
      return
    }

    setFormValues({
      body: campaignQuery.data.campaign.body,
      name: campaignQuery.data.campaign.name,
      recipientIds: campaignQuery.data.recipients.map((recipient) => recipient.recipientId),
      subject: campaignQuery.data.campaign.subject
    })

    setSelectedRecipients(
      campaignQuery.data.recipients.map((recipient) => ({
        email: recipient.email,
        id: recipient.recipientId,
        name: recipient.name
      }))
    )

    setIsHydrated(true)
  }, [campaignQuery.data, isHydrated, mode])

  const pageErrorMessage = useMemo(() => {
    if (!campaignQuery.error) {
      return null
    }

    return getRequestErrorMessage(campaignQuery.error, CAMPAIGN_COPY.errors.generic)
  }, [campaignQuery.error])

  const formErrorMessage = useMemo(() => {
    const activeError = mode === 'edit' ? updateMutation.error : createMutation.error
    const fieldErrors = getRequestFieldErrors(activeError, campaignFormFields)

    if (!activeError) {
      return null
    }

    if (Object.keys(fieldErrors).length > 0) {
      return null
    }

    return getRequestErrorMessage(activeError, CAMPAIGN_COPY.errors.generic)
  }, [createMutation.error, mode, updateMutation.error])

  const fieldErrors = useMemo(() => {
    const activeError = mode === 'edit' ? updateMutation.error : createMutation.error

    return getRequestFieldErrors(activeError, campaignFormFields)
  }, [createMutation.error, mode, updateMutation.error])

  const createRecipientErrorMessage = useMemo(() => {
    if (!createRecipientMutation.error) {
      return null
    }

    return getRequestErrorMessage(createRecipientMutation.error, CAMPAIGN_COPY.errors.generic)
  }, [createRecipientMutation.error])

  const recipientOptions = useMemo(() => {
    const optionMap = new Map<string, { email: string; id: string; name: string }>()

    selectedRecipients.forEach((recipient) => {
      optionMap.set(recipient.id, recipient)
    })

    ;(recipientOptionsQuery.data?.recipients ?? []).forEach((recipient) => {
      optionMap.set(recipient.id, toSelectedRecipient(recipient))
    })

    return [...optionMap.values()]
  }, [recipientOptionsQuery.data?.recipients, selectedRecipients])

  const createRecipientCandidate = useMemo(() => {
    const email = recipientSearch.trim().toLowerCase()

    if (!emailPattern.test(email)) {
      return null
    }

    const emailExists = recipientOptions.some((recipient) => recipient.email.toLowerCase() === email)

    if (emailExists) {
      return null
    }

    return {
      email,
      name: toRecipientNameFromEmail(email)
    }
  }, [recipientOptions, recipientSearch])

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }))
  }

  const handleBodyChange = (value: string) => {
    setFormValues((currentValues) => ({
      ...currentValues,
      body: value
    }))
  }

  const handleRecipientSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    createRecipientMutation.reset()
    setRecipientSearch(event.target.value)
  }

  const handleRecipientToggle = (recipient: { email: string; id: string; name: string }) => {
    createRecipientMutation.reset()
    setSelectedRecipients((currentRecipients) => {
      const isSelected = currentRecipients.some((currentRecipient) => currentRecipient.id === recipient.id)

      const nextRecipients = isSelected
        ? currentRecipients.filter((currentRecipient) => currentRecipient.id !== recipient.id)
        : [...currentRecipients, recipient]

      setFormValues((currentValues) => ({
        ...currentValues,
        recipientIds: nextRecipients.map((currentRecipient) => currentRecipient.id)
      }))

      return nextRecipients
    })
  }

  const handleCreateRecipientFromSearch = () => {
    if (!createRecipientCandidate) {
      return
    }

    createRecipientMutation.reset()
    createRecipientMutation.mutate(createRecipientCandidate)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (mode === 'edit' && campaignId) {
      updateMutation.mutate({
        id: campaignId,
        payload: formValues
      })

      return
    }

    createMutation.mutate(formValues)
  }

  const isReadonly = mode === 'edit' && campaignQuery.data?.campaign.status !== 'draft'
  const isSubmitting = mode === 'edit' ? updateMutation.isPending : createMutation.isPending

  return {
    campaignName: campaignQuery.data?.campaign.name ?? '',
    handleBodyChange,
    createRecipientCandidate,
    createRecipientErrorMessage,
    formErrorMessage,
    formValues,
    fieldErrors,
    handleFieldChange,
    handleCreateRecipientFromSearch,
    handleRecipientSearchChange,
    handleRecipientToggle,
    handleSubmit,
    isLoading: mode === 'edit' && campaignQuery.isPending && !isHydrated,
    isCreatingRecipient: createRecipientMutation.isPending,
    isReadonly,
    isRecipientOptionsLoading: recipientOptionsQuery.isPending,
    isSubmitting,
    mode,
    onBack: () => navigate(-1),
    pageErrorMessage,
    recipientOptions,
    recipientSearch,
    selectedRecipients,
    status: campaignQuery.data?.campaign.status ?? 'draft'
  }
}
