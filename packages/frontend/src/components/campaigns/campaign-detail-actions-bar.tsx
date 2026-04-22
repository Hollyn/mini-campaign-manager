import { CampaignStatus } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { PageBackLink } from '../ui/page-back-link'
import { CampaignStatusBadge } from './campaign-status-badge'

interface CampaignDetailActionsBarProps {
  canDelete: boolean
  canEdit: boolean
  canSchedule: boolean
  canSend: boolean
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
  canDelete,
  canEdit,
  canSchedule,
  canSend,
  isSending,
  onBack,
  onDelete,
  onEdit,
  onSchedule,
  onSend,
  sendErrorMessage,
  status
}: CampaignDetailActionsBarProps) => (
  <div className="space-y-3">
    <div className="flex items-start justify-between gap-3">
      <CampaignStatusBadge status={status} />
    </div>

    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <PageBackLink label={CAMPAIGN_COPY.actions.back} onClick={onBack} />

      <div className="flex flex-wrap gap-2 lg:justify-end">
        {canEdit ? (
          <Button className="px-3 py-2" onClick={onEdit} type="button" variant="secondary">
            {CAMPAIGN_COPY.actions.edit}
          </Button>
        ) : null}

        {canSchedule ? (
          <Button className="px-3 py-2" onClick={onSchedule} type="button" variant="secondary">
            {CAMPAIGN_COPY.actions.schedule}
          </Button>
        ) : null}

        {canSend ? (
          <Button className="px-3 py-2" onClick={onSend} type="button">
            {CAMPAIGN_COPY.actions.send}
          </Button>
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

    {sendErrorMessage ? <Alert variant="destructive">{sendErrorMessage}</Alert> : null}
  </div>
)
