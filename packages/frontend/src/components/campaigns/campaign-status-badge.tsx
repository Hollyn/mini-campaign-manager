import { CampaignStatus } from '../../api/types'
import { CAMPAIGN_STATUS_DOT_STYLES, CAMPAIGN_STATUS_STYLES } from '../../constants/campaigns'
import { cn } from '../../lib/utils'
import { getCampaignStatusLabel } from '../../lib/campaign-format'

interface CampaignStatusBadgeProps {
  status: CampaignStatus
}

export const CampaignStatusBadge = ({ status }: CampaignStatusBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.72rem] font-medium',
      CAMPAIGN_STATUS_STYLES[status]
    )}
  >
    <span className={cn('h-2 w-2 rounded-full', CAMPAIGN_STATUS_DOT_STYLES[status])} />
    {getCampaignStatusLabel(status)}
  </span>
)
