import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { RichTextContent } from '../ui/rich-text-content'

interface CampaignDetailMessagePanelProps {
  html: string
  isExpanded: boolean
  onToggle: () => void
}

export const CampaignDetailMessagePanel = ({ html, isExpanded, onToggle }: CampaignDetailMessagePanelProps) => (
  <Card className="rounded-[1.5rem] bg-surface-container-low px-4 py-4 sm:px-5 sm:py-4">
    <div className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.72rem] tracking-[0.08em] text-on-surface-variant">
          {CAMPAIGN_COPY.detail.bodyLabel}
        </p>

        <Button onClick={onToggle} type="button" variant="tertiary">
          {isExpanded ? CAMPAIGN_COPY.detail.collapseBody : CAMPAIGN_COPY.detail.expandBody}
        </Button>
      </div>

      <div className={cn('overflow-hidden transition-[max-height] duration-300', isExpanded ? 'max-h-none' : 'max-h-40')}>
        <RichTextContent className="rich-text-content text-sm leading-7 text-on-surface-variant" html={html} />
      </div>
    </div>
  </Card>
)
