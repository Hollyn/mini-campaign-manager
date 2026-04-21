import { useParams } from 'react-router-dom'

import { CampaignDetailHeader } from '../components/campaigns/campaign-detail-header'
import { CampaignDetailSkeleton } from '../components/campaigns/campaign-detail-skeleton'
import { CampaignRecipientsTable } from '../components/campaigns/campaign-recipients-table'
import { CampaignStatsPanel } from '../components/campaigns/campaign-stats-panel'
import { DeleteCampaignModal } from '../components/campaigns/delete-campaign-modal'
import { ScheduleCampaignModal } from '../components/campaigns/schedule-campaign-modal'
import { Alert } from '../components/ui/alert'
import { Card } from '../components/ui/card'
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
    <div className="space-y-6">
      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}

      <CampaignDetailHeader
        canDelete={page.canDelete}
        canSchedule={page.canSchedule}
        canSend={page.canSend}
        campaign={page.campaign}
        isSending={page.isSending}
        onBack={page.onBack}
        onDelete={page.openDeleteModal}
        onSchedule={page.openScheduleModal}
        onSend={page.handleSend}
        sendErrorMessage={page.sendErrorMessage}
        status={page.status}
      />

      <CampaignStatsPanel stats={page.stats} />

      <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7">
        <p className="text-[0.72rem] uppercase tracking-[0.24em] text-on-surface-variant">{CAMPAIGN_COPY.detail.bodyLabel}</p>
        <div className="mt-4 whitespace-pre-wrap text-sm leading-7 text-on-surface-variant">{page.campaign.body}</div>
      </Card>

      <CampaignRecipientsTable recipients={page.recipients} />

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
