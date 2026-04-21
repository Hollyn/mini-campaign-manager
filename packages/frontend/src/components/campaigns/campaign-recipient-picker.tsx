import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { cn } from '../../lib/utils'
import { Input } from '../ui/input'

interface RecipientOption {
  email: string
  id: string
  name: string
}

interface CampaignRecipientPickerProps {
  isLoading: boolean
  onRecipientSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRecipientToggle: (recipient: RecipientOption) => void
  recipientOptions: RecipientOption[]
  recipientSearch: string
  selectedRecipients: RecipientOption[]
}

export const CampaignRecipientPicker = ({
  isLoading,
  onRecipientSearchChange,
  onRecipientToggle,
  recipientOptions,
  recipientSearch,
  selectedRecipients
}: CampaignRecipientPickerProps) => {
  const selectedIds = new Set(selectedRecipients.map((recipient) => recipient.id))

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Input
          onChange={onRecipientSearchChange}
          placeholder={CAMPAIGN_COPY.form.searchPlaceholder}
          type="search"
          value={recipientSearch}
        />
        <p className="text-xs text-on-surface-variant">{CAMPAIGN_COPY.form.recipientHelper}</p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {recipientOptions.map((recipient) => {
          const isSelected = selectedIds.has(recipient.id)

          return (
            <button
              className={cn(
                'rounded-[1.25rem] border px-4 py-4 text-left transition-colors',
                isSelected
                  ? 'border-primary bg-primary-container/60 text-on-primary-container'
                  : 'border-surface-container-high bg-surface-container-lowest text-on-surface hover:border-primary/30 hover:bg-surface-container-low'
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

      {!isLoading && recipientOptions.length === 0 ? (
        <div className="rounded-[1.25rem] border border-dashed border-surface-container-high bg-surface-container-low px-4 py-6 text-sm text-on-surface-variant">
          {CAMPAIGN_COPY.form.recipientEmpty}
        </div>
      ) : null}

      <div className="space-y-3 rounded-[1.25rem] bg-surface-container-low p-4">
        <p className="text-[0.72rem] uppercase tracking-[0.22em] text-on-surface-variant">{CAMPAIGN_COPY.form.selectedLabel}</p>
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
    </div>
  )
}
