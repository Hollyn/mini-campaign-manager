import { CampaignRecipientActivityFilter } from '../../constants/campaigns'
import { cn } from '../../lib/utils'

interface CampaignRecipientFilterOption {
  count: number
  label: string
  value: CampaignRecipientActivityFilter
}

interface CampaignRecipientFilterBarProps {
  activeFilter: CampaignRecipientActivityFilter
  onChange: (value: CampaignRecipientActivityFilter) => void
  options: CampaignRecipientFilterOption[]
}

export const CampaignRecipientFilterBar = ({
  activeFilter,
  onChange,
  options
}: CampaignRecipientFilterBarProps) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const isActive = option.value === activeFilter

      return (
        <button
          className={cn(
            'inline-flex items-center gap-2 rounded-full px-2.5 py-1.5 text-[0.72rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            isActive
              ? 'bg-primary text-on-primary'
              : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-background'
          )}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          <span>{option.label}</span>
          <span className={cn('rounded-full px-1.5 py-0.5', isActive ? 'bg-white/20 text-on-primary' : 'bg-white/80 text-on-surface')}>
            {option.count}
          </span>
        </button>
      )
    })}
  </div>
)
