import { Campaign } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { getCampaignDetailMetaItems } from '../../lib/campaign-format'
import { Card } from '../ui/card'

interface CampaignDetailInfoPanelProps {
  campaign: Campaign
  recipientSummary: string
}

export const CampaignDetailInfoPanel = ({ campaign, recipientSummary }: CampaignDetailInfoPanelProps) => (
  <Card className="rounded-[1.5rem] bg-surface-container-low px-4 py-4 sm:px-5 sm:py-5 xl:sticky xl:top-4">
    <div className="space-y-4">
      <div className="space-y-1">
        <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
          {CAMPAIGN_COPY.detail.infoTitle}
        </p>
        <p className="text-base font-medium text-on-background">{campaign.name}</p>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
            {CAMPAIGN_COPY.detail.fields.title}
          </p>
          <p className="text-base font-medium text-on-background">{campaign.name}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
            {CAMPAIGN_COPY.detail.fields.subject}
          </p>
          <p className="text-sm leading-6 text-on-surface-variant">{campaign.subject}</p>
        </div>

        <div className="space-y-1">
          <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
            {CAMPAIGN_COPY.detail.fields.audience}
          </p>
          <p className="text-sm font-medium text-on-background">{recipientSummary}</p>
        </div>
      </div>

      <div className="grid gap-2">
        {getCampaignDetailMetaItems(campaign).map((item) => (
          <div className="rounded-[1rem] bg-surface-container-lowest px-3 py-3" key={item.label}>
            <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-on-background">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  </Card>
)
