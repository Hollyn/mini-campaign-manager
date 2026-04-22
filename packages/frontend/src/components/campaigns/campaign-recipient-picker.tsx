import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { cn } from '../../lib/utils'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

interface RecipientOption {
  email: string
  id: string
  name: string
}

interface CreateRecipientCandidate {
  email: string
  name: string
}

interface CampaignRecipientPickerProps {
  createRecipientCandidate: CreateRecipientCandidate | null
  createRecipientErrorMessage: string | null
  isLoading: boolean
  isCreatingRecipient: boolean
  onCreateRecipient: () => void
  onRecipientSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRecipientToggle: (recipient: RecipientOption) => void
  recipientOptions: RecipientOption[]
  recipientSearch: string
  selectedRecipients: RecipientOption[]
}

export const CampaignRecipientPicker = ({
  createRecipientCandidate,
  createRecipientErrorMessage,
  isLoading,
  isCreatingRecipient,
  onCreateRecipient,
  onRecipientSearchChange,
  onRecipientToggle,
  recipientOptions,
  recipientSearch,
  selectedRecipients
}: CampaignRecipientPickerProps) => {
  const selectedIds = new Set(selectedRecipients.map((recipient) => recipient.id))
  const availableRecipients = recipientOptions.filter((recipient) => !selectedIds.has(recipient.id))

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <div className="space-y-3 rounded-[1.25rem] bg-surface-container-low p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-on-background">{CAMPAIGN_COPY.form.selectedLabel}</p>
          <span className="text-sm text-on-surface-variant">{CAMPAIGN_COPY.form.selectedCount(selectedRecipients.length)}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedRecipients.length > 0 ? (
            selectedRecipients.map((recipient) => (
              <button
                className="rounded-full bg-white px-3 py-2 text-sm text-on-surface shadow-[0_8px_20px_rgba(31,49,89,0.06)]"
                key={recipient.id}
                onClick={() => onRecipientToggle(recipient)}
                type="button"
              >
                {recipient.name}
              </button>
            ))
          ) : (
            <p className="text-sm text-on-surface-variant">{CAMPAIGN_COPY.helper.emptyRecipients}</p>
          )}
        </div>
      </div>

      <Input
        onChange={onRecipientSearchChange}
        placeholder={CAMPAIGN_COPY.form.searchPlaceholder}
        type="search"
        value={recipientSearch}
      />

      {createRecipientCandidate ? (
        <div className="rounded-[1.25rem] border border-dashed border-primary/25 bg-primary/5 px-4 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-on-background">{CAMPAIGN_COPY.form.createRecipient}</p>
              <p className="text-sm text-on-surface-variant">
                {CAMPAIGN_COPY.form.createRecipientSummary(
                  createRecipientCandidate.email,
                  createRecipientCandidate.name
                )}
              </p>
            </div>

            <Button disabled={isCreatingRecipient} onClick={onCreateRecipient} type="button">
              {isCreatingRecipient ? CAMPAIGN_COPY.form.createRecipientPending : CAMPAIGN_COPY.form.createRecipient}
            </Button>
          </div>
        </div>
      ) : null}

      {createRecipientErrorMessage ? <Alert variant="destructive">{createRecipientErrorMessage}</Alert> : null}

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
          {availableRecipients.map((recipient) => {
            return (
              <button
                className={cn(
                  'rounded-[1.25rem] border px-4 py-4 text-left transition-colors',
                  'border-surface-container-high bg-surface-container-lowest text-on-surface hover:border-primary/30 hover:bg-surface-container-low'
                )}
                key={recipient.id}
                onClick={() => onRecipientToggle(recipient)}
                type="button"
              >
                <p className="font-medium">{recipient.name}</p>
                <p className="mt-1 text-sm text-on-surface-variant">{recipient.email}</p>
              </button>
            )
          })}
        </div>

        {!isLoading && availableRecipients.length === 0 ? (
          <div className="rounded-[1.25rem] border border-dashed border-surface-container-high bg-surface-container-low px-4 py-6 text-sm text-on-surface-variant">
            {CAMPAIGN_COPY.form.recipientEmpty}
          </div>
        ) : null}
      </div>
    </div>
  )
}
