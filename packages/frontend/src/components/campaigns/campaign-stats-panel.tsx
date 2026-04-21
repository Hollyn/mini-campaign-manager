import { CampaignStats } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { formatCampaignRate, getCampaignStatCards } from '../../lib/campaign-format'
import { Card } from '../ui/card'

interface CampaignStatsPanelProps {
  stats: CampaignStats
}

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div className="space-y-2">
    <div className="flex items-end justify-between gap-4">
      <p className="text-[0.72rem] uppercase tracking-[0.24em] text-on-surface-variant">{label}</p>
      <p className="text-sm font-medium text-on-background">{formatCampaignRate(value)}</p>
    </div>
    <div className="h-2 overflow-hidden rounded-full bg-surface-container-high">
      <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: formatCampaignRate(value) }} />
    </div>
  </div>
)

export const CampaignStatsPanel = ({ stats }: CampaignStatsPanelProps) => (
  <section className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(280px,1fr)]">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {getCampaignStatCards(stats).map((card) => (
        <Card className="rounded-[1.5rem] border border-white/70 bg-surface-container-lowest/95 p-5" key={card.label}>
          <p className="text-[0.72rem] uppercase tracking-[0.24em] text-on-surface-variant">{card.label}</p>
          <p className="mt-3 text-3xl font-medium tracking-tight text-on-background">{card.value}</p>
        </Card>
      ))}
    </div>
    <Card className="rounded-[1.5rem] border border-white/70 bg-surface-container-lowest/95 p-5">
      <div className="space-y-6">
        <ProgressBar label={CAMPAIGN_COPY.stats.sendRate} value={stats.send_rate} />
        <ProgressBar label={CAMPAIGN_COPY.stats.openRate} value={stats.open_rate} />
      </div>
    </Card>
  </section>
)
