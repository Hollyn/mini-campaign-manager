import { ChangeEvent } from 'react'

import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'

interface CampaignTableToolbarProps {
  onCreateCampaign: () => void
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  search: string
  totalCampaigns: number
}

export const CampaignTableToolbar = ({
  onCreateCampaign,
  onSearchChange,
  search,
  totalCampaigns
}: CampaignTableToolbarProps) => (
  <Card className="rounded-[1.5rem] border border-white/70 bg-white/85 px-4 py-4 sm:px-5 sm:py-5">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <p className="text-sm font-medium text-on-surface-variant">{CAMPAIGN_COPY.helper.totalCount(totalCampaigns)}</p>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="w-full sm:w-[320px]">
          <label className="sr-only" htmlFor="campaign-search">
            {CAMPAIGN_COPY.list.searchLabel}
          </label>
          <Input
            className="bg-surface-container-low"
            id="campaign-search"
            onChange={onSearchChange}
            placeholder={CAMPAIGN_COPY.list.searchPlaceholder}
            type="search"
            value={search}
          />
        </div>

        <Button onClick={onCreateCampaign} type="button">
          {CAMPAIGN_COPY.actions.create}
        </Button>
      </div>
    </div>
  </Card>
)
