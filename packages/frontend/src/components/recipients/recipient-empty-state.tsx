import { RECIPIENT_COPY } from '../../constants/recipients'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface RecipientEmptyStateProps {
  onAddRecipient: () => void
}

export const RecipientEmptyState = ({ onAddRecipient }: RecipientEmptyStateProps) => (
  <Card className="rounded-[1.75rem] border border-dashed border-primary/20 bg-surface-container-lowest/90 px-6 py-12 text-center sm:px-10">
    <div className="mx-auto max-w-md space-y-4">
      <p className="text-[0.72rem] font-medium tracking-[0.08em] text-primary">Recipient roster</p>
      <h2 className="text-3xl font-medium tracking-tight text-on-background">{RECIPIENT_COPY.empty.title}</h2>
      <p className="text-sm leading-7 text-on-surface-variant">{RECIPIENT_COPY.empty.description}</p>
      <Button onClick={onAddRecipient} type="button">
        {RECIPIENT_COPY.actions.add}
      </Button>
    </div>
  </Card>
)
