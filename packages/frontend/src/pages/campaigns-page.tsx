import { CampaignEmptyState } from '../components/campaigns/campaign-empty-state'
import { CampaignListSkeleton } from '../components/campaigns/campaign-list-skeleton'
import { CampaignTable } from '../components/campaigns/campaign-table'
import { DeleteCampaignModal } from '../components/campaigns/delete-campaign-modal'
import { Alert } from '../components/ui/alert'
import { useCampaignsPage } from '../hooks/use-campaigns-page'

export const CampaignsPage = () => {
  const page = useCampaignsPage()

  if (page.isLoading) {
    return <CampaignListSkeleton />
  }

  return (
    <div className="space-y-6">
      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}

      {page.totalCampaigns === 0 && page.search.length === 0 && !page.pageErrorMessage ? (
        <CampaignEmptyState onCreateCampaign={page.onCreateCampaign} />
      ) : (
        <CampaignTable
          campaigns={page.campaigns}
          isRefetching={page.isRefetching}
          onCreateCampaign={page.onCreateCampaign}
          onDeleteCampaign={page.onDeleteCampaign}
          onEditCampaign={page.onEditCampaign}
          onNextPage={page.handleNextPage}
          onOpenCampaign={page.onOpenCampaign}
          onPageChange={page.handlePageChange}
          onPageSizeChange={page.handlePageSizeChange}
          onPreviousPage={page.handlePreviousPage}
          onSearchChange={page.handleSearchChange}
          onSortChange={page.handleSortChange}
          pageSize={page.pageSize}
          pagination={page.pagination}
          search={page.search}
          sortBy={page.sortBy}
          sortDirection={page.sortDirection}
        />
      )}

      <DeleteCampaignModal
        campaign={page.deleteCandidate}
        errorMessage={page.deleteErrorMessage}
        isOpen={page.isDeleteOpen}
        isPending={page.isDeleting}
        onClose={page.closeDeleteModal}
        onConfirm={page.handleDeleteConfirm}
      />
    </div>
  )
}
