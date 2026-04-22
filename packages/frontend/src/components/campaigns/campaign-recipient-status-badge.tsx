import { CampaignRecipientStatus } from '../../api/types'
import { cn } from '../../lib/utils'

const RECIPIENT_STATUS_STYLES = {
  failed: 'bg-rose-100 text-rose-700',
  pending: 'bg-amber-100 text-amber-800',
  sent: 'bg-emerald-100 text-emerald-700'
} as const

const RECIPIENT_STATUS_DOT_STYLES = {
  failed: 'bg-rose-500',
  pending: 'bg-amber-500',
  sent: 'bg-emerald-500'
} as const

const RECIPIENT_STATUS_LABELS = {
  failed: 'Failed',
  pending: 'Pending',
  sent: 'Sent'
} as const

interface CampaignRecipientStatusBadgeProps {
  status: CampaignRecipientStatus
}

export const CampaignRecipientStatusBadge = ({ status }: CampaignRecipientStatusBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-medium',
      RECIPIENT_STATUS_STYLES[status]
    )}
  >
    <span className={cn('h-2 w-2 rounded-full', RECIPIENT_STATUS_DOT_STYLES[status])} />
    {RECIPIENT_STATUS_LABELS[status]}
  </span>
)
