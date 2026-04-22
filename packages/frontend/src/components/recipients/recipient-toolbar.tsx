import { RECIPIENT_COPY } from '../../constants/recipients'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface RecipientToolbarProps {
  onAddRecipient: () => void
  totalRecipients: number
}

export const RecipientToolbar = ({ onAddRecipient, totalRecipients }: RecipientToolbarProps) => (
  <Card className="rounded-[1.5rem] border border-white/70 bg-white/85 px-4 py-4 sm:px-5 sm:py-5">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm font-medium text-on-surface-variant">{RECIPIENT_COPY.helper.totalCount(totalRecipients)}</p>

      <Button onClick={onAddRecipient} type="button">
        {RECIPIENT_COPY.actions.add}
      </Button>
    </div>
  </Card>
)
