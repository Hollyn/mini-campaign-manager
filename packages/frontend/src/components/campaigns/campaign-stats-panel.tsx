import { CampaignStats } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { formatCampaignRate, getCampaignStatCards } from '../../lib/campaign-format'
import { Card } from '../ui/card'

interface CampaignStatsPanelProps {
  stats: CampaignStats
}

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div className="rounded-[1rem] bg-surface-container-lowest px-3 py-3">
    <div className="space-y-1.5">
      <div className="flex items-end justify-between gap-3">
        <p className="text-[0.68rem] tracking-[0.08em] text-on-surface-variant">{label}</p>
        <p className="text-sm font-medium text-on-background">{formatCampaignRate(value)}</p>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-high">
        <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: formatCampaignRate(value) }} />
      </div>
    </div>
  </div>
)

export const CampaignStatsPanel = ({ stats }: CampaignStatsPanelProps) => (
  <Card className="rounded-[1.5rem] bg-surface-container-low px-4 py-4 sm:px-5 sm:py-4">
    <div className="space-y-2">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {getCampaignStatCards(stats).map((card) => (
          <div className="rounded-[1rem] bg-surface-container-lowest px-3 py-3" key={card.label}>
            <p className="text-[0.68rem] tracking-[0.08em] text-on-surface-variant">{card.label}</p>
            <p className="mt-1.5 text-xl font-medium tracking-tight text-on-background sm:text-2xl">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-2 lg:grid-cols-2">
        <ProgressBar label={CAMPAIGN_COPY.stats.sendRate} value={stats.send_rate} />
        <ProgressBar label={CAMPAIGN_COPY.stats.openRate} value={stats.open_rate} />
      </div>
    </div>
  </Card>
)
