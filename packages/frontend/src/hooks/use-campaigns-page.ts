import { ChangeEvent, useMemo, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { CampaignListItem } from '../api/types'
import {
  CAMPAIGN_SEARCH_DEBOUNCE_MS,
  campaignDetailRoute,
  campaignEditRoute,
  campaignNewRoute,
  CAMPAIGN_COPY
} from '../constants/campaigns'
import { useDebouncedValue } from './use-debounced-value'
import { useCampaigns } from './use-campaigns'
import { useDeleteCampaign } from './use-delete-campaign'
import { getRequestErrorMessage } from '../lib/request-error'

export const useCampaignsPage = () => {
  const navigate = useNavigate()
  const [activePage, setActivePage] = useState(1)
  const [deleteCandidate, setDeleteCandidate] = useState<CampaignListItem | null>(null)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search, CAMPAIGN_SEARCH_DEBOUNCE_MS)
  const campaignsQuery = useCampaigns(activePage, debouncedSearch)
  const deleteMutation = useDeleteCampaign({
    onSuccess: async () => {
      const currentLength = campaignsQuery.data?.campaigns.length ?? 0

      if (activePage > 1 && currentLength === 1) {
        setActivePage((currentPage) => currentPage - 1)
      }

      setDeleteCandidate(null)
    }
  })

  const pageErrorMessage = useMemo(() => {
    if (!campaignsQuery.error) {
      return null
    }

    return getRequestErrorMessage(campaignsQuery.error, CAMPAIGN_COPY.errors.generic)
  }, [campaignsQuery.error])

  const deleteErrorMessage = useMemo(() => {
    if (!deleteMutation.error) {
      return null
    }

    return getRequestErrorMessage(deleteMutation.error, CAMPAIGN_COPY.errors.generic)
  }, [deleteMutation.error])

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
    setActivePage(1)
  }

  const handleNextPage = () => {
    const totalPages = campaignsQuery.data?.pagination.totalPages ?? 0

    setActivePage((currentPage) => (currentPage >= totalPages ? currentPage : currentPage + 1))
  }

  const handlePreviousPage = () => {
    setActivePage((currentPage) => (currentPage <= 1 ? currentPage : currentPage - 1))
  }

  const openDeleteModal = (campaign: CampaignListItem) => {
    deleteMutation.reset()
    setDeleteCandidate(campaign)
  }

  const closeDeleteModal = () => {
    deleteMutation.reset()
    setDeleteCandidate(null)
  }

  const handleDeleteConfirm = () => {
    if (!deleteCandidate) {
      return
    }

    deleteMutation.mutate(deleteCandidate.id)
  }

  return {
    campaigns: campaignsQuery.data?.campaigns ?? [],
    closeDeleteModal,
    closeToLiveTotal: campaignsQuery.data?.pagination.total ?? 0,
    deleteCandidate,
    deleteErrorMessage,
    handleDeleteConfirm,
    handleNextPage,
    handlePreviousPage,
    handleSearchChange,
    isDeleteOpen: Boolean(deleteCandidate),
    isDeleting: deleteMutation.isPending,
    isLoading: campaignsQuery.isPending,
    isRefetching: campaignsQuery.isFetching,
    onCreateCampaign: () => navigate(campaignNewRoute),
    onDeleteCampaign: openDeleteModal,
    onEditCampaign: (campaignId: string) => navigate(campaignEditRoute(campaignId)),
    onOpenCampaign: (campaignId: string) => navigate(campaignDetailRoute(campaignId)),
    pageErrorMessage,
    pagination: campaignsQuery.data?.pagination ?? null,
    search,
    searchValue: debouncedSearch
  }
}
