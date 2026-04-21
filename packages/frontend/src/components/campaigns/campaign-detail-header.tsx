import { Campaign, CampaignStatus } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { formatCampaignDate, formatCampaignDateTime } from '../../lib/campaign-format'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { ButtonSkeleton } from '../ui/button-skeleton'
import { Card } from '../ui/card'
import { CampaignStatusBadge } from './campaign-status-badge'

interface CampaignDetailHeaderProps {
  canDelete: boolean
  canSchedule: boolean
  canSend: boolean
  campaign: Campaign
  isSending: boolean
  onBack: () => void
  onDelete: () => void
  onSchedule: () => void
  onSend: () => void
  sendErrorMessage: string | null
  status: CampaignStatus
}

export const CampaignDetailHeader = ({
  canDelete,
  canSchedule,
  canSend,
  campaign,
  isSending,
  onBack,
  onDelete,
  onSchedule,
  onSend,
  sendErrorMessage,
  status
}: CampaignDetailHeaderProps) => (
  <Card className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(214,228,255,0.96),rgba(255,255,255,0.96)_55%,rgba(236,243,255,0.98))] px-6 py-7 sm:px-8 sm:py-8">
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4">
          <button className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-primary" onClick={onBack} type="button">
            {CAMPAIGN_COPY.actions.back}
          </button>
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-4xl font-medium tracking-tight text-on-background sm:text-[3.2rem]">{campaign.name}</h1>
              <CampaignStatusBadge status={status} />
            </div>
            <p className="text-base text-on-surface-variant">{campaign.subject}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {canSchedule ? (
            <Button onClick={onSchedule} type="button" variant="secondary">
              {CAMPAIGN_COPY.actions.schedule}
            </Button>
          ) : null}

          {canSend ? (
            <Button onClick={onSend} type="button">
              {CAMPAIGN_COPY.actions.send}
            </Button>
          ) : null}

          {canDelete ? (
            <Button onClick={onDelete} type="button" variant="destructive">
              {CAMPAIGN_COPY.actions.confirmDelete}
            </Button>
          ) : null}

          {isSending ? <ButtonSkeleton aria-label={CAMPAIGN_COPY.states.sending} /> : null}
        </div>
      </div>

      {sendErrorMessage ? <Alert variant="destructive">{sendErrorMessage}</Alert> : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.25rem] bg-white/80 p-4 shadow-[0_18px_50px_rgba(31,49,89,0.08)] backdrop-blur">
          <p className="text-[0.7rem] uppercase tracking-[0.26em] text-on-surface-variant">Created</p>
          <p className="mt-2 text-lg font-medium text-on-background">{formatCampaignDate(campaign.createdAt)}</p>
        </div>
        <div className="rounded-[1.25rem] bg-white/80 p-4 shadow-[0_18px_50px_rgba(31,49,89,0.08)] backdrop-blur">
          <p className="text-[0.7rem] uppercase tracking-[0.26em] text-on-surface-variant">Last update</p>
          <p className="mt-2 text-lg font-medium text-on-background">{formatCampaignDate(campaign.updatedAt)}</p>
        </div>
        <div className="rounded-[1.25rem] bg-white/80 p-4 shadow-[0_18px_50px_rgba(31,49,89,0.08)] backdrop-blur">
          <p className="text-[0.7rem] uppercase tracking-[0.26em] text-on-surface-variant">Scheduled for</p>
          <p className="mt-2 text-lg font-medium text-on-background">{formatCampaignDateTime(campaign.scheduledAt)}</p>
        </div>
      </div>
    </div>
  </Card>
)
