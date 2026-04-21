import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface CampaignEmptyStateProps {
  onCreateCampaign: () => void
}

export const CampaignEmptyState = ({ onCreateCampaign }: CampaignEmptyStateProps) => (
  <Card className="rounded-[1.75rem] border border-dashed border-primary/20 bg-surface-container-lowest/90 px-6 py-12 text-center sm:px-10">
    <div className="mx-auto max-w-md space-y-4">
      <p className="text-[0.72rem] font-medium uppercase tracking-[0.3em] text-primary">Campaign space</p>
      <h2 className="text-3xl font-medium tracking-tight text-on-background">{CAMPAIGN_COPY.empty.title}</h2>
      <p className="text-sm leading-7 text-on-surface-variant">{CAMPAIGN_COPY.empty.description}</p>
      <Button onClick={onCreateCampaign} type="button">
        {CAMPAIGN_COPY.actions.createFirst}
      </Button>
    </div>
  </Card>
)
