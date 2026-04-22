import { useParams } from 'react-router-dom'

import { CampaignDetailActionsBar } from '../components/campaigns/campaign-detail-actions-bar'
import { CampaignDetailInfoPanel } from '../components/campaigns/campaign-detail-info-panel'
import { CampaignDetailMessagePanel } from '../components/campaigns/campaign-detail-message-panel'
import { CampaignDetailSkeleton } from '../components/campaigns/campaign-detail-skeleton'
import { CampaignRecipientsTable } from '../components/campaigns/campaign-recipients-table'
import { CampaignStatsPanel } from '../components/campaigns/campaign-stats-panel'
import { DeleteCampaignModal } from '../components/campaigns/delete-campaign-modal'
import { ScheduleCampaignModal } from '../components/campaigns/schedule-campaign-modal'
import { Alert } from '../components/ui/alert'
import { CAMPAIGN_COPY } from '../constants/campaigns'
import { useCampaignDetailPage } from '../hooks/use-campaign-detail-page'

export const CampaignDetailPage = () => {
  const params = useParams<{ id: string }>()
  const page = useCampaignDetailPage(params.id ?? '')

  if (page.isLoading) {
    return <CampaignDetailSkeleton />
  }

  if (!page.campaign || !page.stats) {
    return page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null
  }

  return (
    <div className="space-y-4">
      <CampaignDetailActionsBar
        canEdit={page.canEdit}
        campaignName={page.campaign.name}
        campaignSubject={page.campaign.subject}
        canDelete={page.canDelete}
        canSchedule={page.canSchedule}
        canSend={page.canSend}
        deliveryValidationMessage={page.deliveryValidationMessage}
        hasRecipients={page.hasRecipients}
        isSending={page.isSending}
        onBack={page.onBack}
        onDelete={page.openDeleteModal}
        onEdit={page.onEdit}
        onSchedule={page.openScheduleModal}
        onSend={page.handleSend}
        sendErrorMessage={page.sendErrorMessage}
        status={page.status}
      />

      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}

      <CampaignStatsPanel stats={page.stats} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)] xl:items-start">
        <CampaignDetailMessagePanel
          html={page.campaign.body}
          isExpanded={page.isBodyExpanded}
          onToggle={page.toggleBodyExpanded}
        />

        <CampaignDetailInfoPanel
          campaign={page.campaign}
          recipientSummary={CAMPAIGN_COPY.detail.recipientSummary(page.totalRecipients)}
        />
      </div>

      <CampaignRecipientsTable
        activeFilter={page.recipientFilter}
        filterOptions={page.recipientFilterOptions}
        isRefetching={page.isRefetching}
        onFilterChange={page.handleRecipientFilterChange}
        onNextPage={page.handleRecipientNextPage}
        onPageChange={page.handleRecipientPageChange}
        onPageSizeChange={page.handleRecipientPageSizeChange}
        onPreviousPage={page.handleRecipientPreviousPage}
        onSearchChange={page.handleRecipientSearchChange}
        onSortChange={page.handleRecipientSortChange}
        pageSize={page.recipientPageSize}
        pagination={page.recipientPagination}
        recipients={page.recipients}
        search={page.recipientSearch}
        sortBy={page.recipientSortBy}
        sortDirection={page.recipientSortDirection}
        totalRecipients={page.totalRecipients}
        visibleRecipientCount={page.visibleRecipientCount}
      />

      <DeleteCampaignModal
        campaign={page.campaign}
        errorMessage={page.deleteErrorMessage}
        isOpen={page.isDeleteOpen}
        isPending={page.isDeleting}
        onClose={page.closeDeleteModal}
        onConfirm={page.handleDeleteConfirm}
      />

      <ScheduleCampaignModal
        errorMessage={page.scheduleErrorMessage}
        isOpen={page.isScheduleOpen}
        isPending={page.isScheduling}
        minValue={page.minScheduleValue}
        onChange={page.handleScheduleChange}
        onClose={page.closeScheduleModal}
        onSubmit={page.handleScheduleSubmit}
        value={page.scheduleValue}
      />
    </div>
  )
}
