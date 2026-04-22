import { Campaign } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'

interface DeleteCampaignModalProps {
  campaign: Campaign | null
  errorMessage: string | null
  isOpen: boolean
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
}

export const DeleteCampaignModal = ({
  campaign,
  errorMessage,
  isOpen,
  isPending,
  onClose,
  onConfirm
}: DeleteCampaignModalProps) => (
  <Dialog
    description={CAMPAIGN_COPY.deleteModal.description}
    eyebrow={CAMPAIGN_COPY.deleteModal.eyebrow}
    footer={
      <>
        <Button onClick={onClose} type="button" variant="tertiary">
          {CAMPAIGN_COPY.actions.cancel}
        </Button>
        <Button onClick={onConfirm} type="button" variant="destructive">
          {isPending ? CAMPAIGN_COPY.states.deleting : CAMPAIGN_COPY.actions.confirmDelete}
        </Button>
      </>
    }
    isOpen={isOpen}
    onClose={onClose}
    title={CAMPAIGN_COPY.deleteModal.title}
  >
    <div className="space-y-4">
      {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
      {campaign ? (
        <div className="rounded-2xl bg-surface-container-low p-4">
          <p className="text-sm font-medium text-on-background">{campaign.name}</p>
          <p className="mt-1 text-sm text-on-surface-variant">{campaign.subject}</p>
        </div>
      ) : null}
    </div>
  </Dialog>
)
