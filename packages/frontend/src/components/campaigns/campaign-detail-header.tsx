import { Campaign } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { formatCampaignDate, formatCampaignDateTime } from '../../lib/campaign-format'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { CampaignStatusBadge } from './campaign-status-badge'

interface CampaignDetailHeaderProps {
  campaign: Campaign
  isSending: boolean
  onBack: () => void
  onDelete: () => void
  onEdit: () => void
  onSchedule: () => void
  onSend: () => void
  sendErrorMessage: string | null
}

export const CampaignDetailHeader = ({
  campaign,
  isSending,
  onBack,
  onDelete,
  onEdit,
  onSchedule,
  onSend,
  sendErrorMessage
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
              <CampaignStatusBadge status={campaign.status} />
            </div>
            <p className="text-base text-on-surface-variant">{campaign.subject}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 lg:justify-end">
          {campaign.status === 'draft' ? (
            <>
              <Button onClick={onEdit} type="button" variant="secondary">
                {CAMPAIGN_COPY.actions.edit}
              </Button>
              <Button onClick={onSchedule} type="button" variant="secondary">
                {CAMPAIGN_COPY.actions.schedule}
              </Button>
              <Button onClick={onSend} type="button">
                {isSending ? CAMPAIGN_COPY.states.sending : CAMPAIGN_COPY.actions.send}
              </Button>
              <Button onClick={onDelete} type="button" variant="destructive">
                {CAMPAIGN_COPY.actions.confirmDelete}
              </Button>
            </>
          ) : null}

          {campaign.status === 'scheduled' ? (
            <Button onClick={onSend} type="button">
              {isSending ? CAMPAIGN_COPY.states.sending : CAMPAIGN_COPY.actions.send}
            </Button>
          ) : null}

          {campaign.status === 'sending' ? (
            <Button disabled type="button">
              {CAMPAIGN_COPY.detail.sending}
            </Button>
          ) : null}
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
