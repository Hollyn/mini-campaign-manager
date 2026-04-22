import { CampaignStatus } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { PageBackLink } from '../ui/page-back-link'
import { CampaignStatusBadge } from './campaign-status-badge'

interface CampaignDetailActionsBarProps {
  canEdit: boolean
  campaignName: string
  campaignSubject: string
  canDelete: boolean
  canSchedule: boolean
  canSend: boolean
  deliveryValidationMessage: string | null
  hasRecipients: boolean
  isSending: boolean
  onBack: () => void
  onDelete: () => void
  onEdit: () => void
  onSchedule: () => void
  onSend: () => void
  sendErrorMessage: string | null
  status: CampaignStatus
}

export const CampaignDetailActionsBar = ({
  canEdit,
  campaignName,
  campaignSubject,
  canDelete,
  canSchedule,
  canSend,
  deliveryValidationMessage,
  hasRecipients,
  isSending,
  onBack,
  onDelete,
  onEdit,
  onSchedule,
  onSend,
  sendErrorMessage,
  status
}: CampaignDetailActionsBarProps) => {
  const scheduleButton = (
    <Button className="px-3 py-2" disabled={!hasRecipients} onClick={onSchedule} type="button" variant="secondary">
      {CAMPAIGN_COPY.actions.schedule}
    </Button>
  )

  const sendButton = (
    <Button className="px-3 py-2" disabled={!hasRecipients} onClick={onSend} type="button">
      {CAMPAIGN_COPY.actions.send}
    </Button>
  )

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <PageBackLink label={CAMPAIGN_COPY.actions.back} onClick={onBack} />

          <div className="space-y-2">
            <CampaignStatusBadge status={status} />
            <div className="space-y-1">
              <h1 className="text-3xl font-medium tracking-tight text-on-background">{campaignName}</h1>
              <p className="max-w-3xl text-sm leading-6 text-on-surface-variant">{campaignSubject}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 lg:justify-end">
          {canEdit ? (
            <Button className="px-3 py-2" onClick={onEdit} type="button" variant="tertiary">
              {CAMPAIGN_COPY.actions.edit}
            </Button>
          ) : null}

          {canSchedule ? (
            hasRecipients ? (
              scheduleButton
            ) : (
              <div className="cursor-not-allowed" onClick={onSchedule}>
                {scheduleButton}
              </div>
            )
          ) : null}

          {canSend ? (
            hasRecipients ? (
              sendButton
            ) : (
              <div className="cursor-not-allowed" onClick={onSend}>
                {sendButton}
              </div>
            )
          ) : null}

          {canDelete ? (
            <Button className="px-3 py-2" onClick={onDelete} type="button" variant="destructive">
              {CAMPAIGN_COPY.actions.delete}
            </Button>
          ) : null}

          {isSending ? (
            <Button className="px-3 py-2" disabled type="button" variant="secondary">
              {CAMPAIGN_COPY.detail.sending}
            </Button>
          ) : null}
        </div>
      </div>

      {deliveryValidationMessage ? <Alert>{deliveryValidationMessage}</Alert> : null}
      {sendErrorMessage ? <Alert variant="destructive">{sendErrorMessage}</Alert> : null}
    </div>
  )
}
