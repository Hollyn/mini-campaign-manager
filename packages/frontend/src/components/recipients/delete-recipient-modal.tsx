import { Recipient } from '../../api/types'
import { RECIPIENT_COPY } from '../../constants/recipients'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'

interface DeleteRecipientModalProps {
  errorMessage: string | null
  isOpen: boolean
  isPending: boolean
  onClose: () => void
  onConfirm: () => void
  recipient: Recipient | null
}

export const DeleteRecipientModal = ({
  errorMessage,
  isOpen,
  isPending,
  onClose,
  onConfirm,
  recipient
}: DeleteRecipientModalProps) => (
  <Dialog
    description={RECIPIENT_COPY.deleteModal.description}
    eyebrow={RECIPIENT_COPY.deleteModal.eyebrow}
    footer={
      <>
        <Button onClick={onClose} type="button" variant="tertiary">
          {RECIPIENT_COPY.actions.cancel}
        </Button>
        <Button onClick={onConfirm} type="button" variant="destructive">
          {isPending ? RECIPIENT_COPY.states.deleting : RECIPIENT_COPY.actions.delete}
        </Button>
      </>
    }
    isOpen={isOpen}
    onClose={onClose}
    title={RECIPIENT_COPY.deleteModal.title}
  >
    <div className="space-y-4">
      {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
      {recipient ? (
        <div className="rounded-2xl bg-surface-container-low p-4">
          <p className="text-sm font-medium text-on-background">{recipient.name}</p>
          <p className="mt-1 text-sm text-on-surface-variant">{recipient.email}</p>
        </div>
      ) : null}
    </div>
  </Dialog>
)
