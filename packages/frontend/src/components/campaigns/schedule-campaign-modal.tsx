import { FormEventHandler } from 'react'

import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface ScheduleCampaignModalProps {
  errorMessage: string | null
  isOpen: boolean
  isPending: boolean
  onChange: (value: string) => void
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  value: string
}

export const ScheduleCampaignModal = ({
  errorMessage,
  isOpen,
  isPending,
  onChange,
  onClose,
  onSubmit,
  value
}: ScheduleCampaignModalProps) => (
  <Dialog
    description={CAMPAIGN_COPY.detail.scheduleDescription}
    eyebrow={CAMPAIGN_COPY.detail.scheduleEyebrow}
    footer={
      <>
        <Button onClick={onClose} type="button" variant="tertiary">
          {CAMPAIGN_COPY.actions.cancel}
        </Button>
        <Button form="schedule-campaign-form" type="submit">
          {isPending ? CAMPAIGN_COPY.states.scheduling : CAMPAIGN_COPY.actions.schedule}
        </Button>
      </>
    }
    isOpen={isOpen}
    onClose={onClose}
    title={CAMPAIGN_COPY.detail.scheduleTitle}
  >
    <form className="space-y-4" id="schedule-campaign-form" onSubmit={onSubmit}>
      {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
      <div className="space-y-2">
        <Label htmlFor="scheduled-at">Schedule date</Label>
        <Input id="scheduled-at" onChange={(event) => onChange(event.target.value)} type="datetime-local" value={value} />
      </div>
    </form>
  </Dialog>
)
