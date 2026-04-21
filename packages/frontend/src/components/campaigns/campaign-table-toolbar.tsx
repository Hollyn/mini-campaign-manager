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
  <Card className="overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(214,228,255,0.96),rgba(255,255,255,0.96)_52%,rgba(236,243,255,0.98))] px-6 py-7 sm:px-8 sm:py-8">
    <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
      <div className="max-w-2xl space-y-4">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-primary">{CAMPAIGN_COPY.intro.badge}</p>
        <div className="space-y-3">
          <h1 className="text-4xl font-medium tracking-tight text-on-background sm:text-[3.4rem]">{CAMPAIGN_COPY.intro.title}</h1>
          <p className="max-w-xl text-sm leading-7 text-on-surface-variant sm:text-base">{CAMPAIGN_COPY.intro.description}</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,360px)_auto] xl:min-w-[520px]">
        <div className="rounded-[1.5rem] bg-white/80 p-5 shadow-[0_18px_50px_rgba(31,49,89,0.08)] backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-on-surface-variant">{CAMPAIGN_COPY.intro.liveTotalLabel}</p>
              <p className="mt-2 text-3xl font-medium tracking-tight text-on-background">{totalCampaigns}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{CAMPAIGN_COPY.helper.totalCount(totalCampaigns)}</p>
            </div>
            <Button onClick={onCreateCampaign} type="button">
              {CAMPAIGN_COPY.actions.create}
            </Button>
          </div>
          <div className="mt-5 space-y-2">
            <label className="text-[0.68rem] uppercase tracking-[0.22em] text-on-surface-variant" htmlFor="campaign-search">
              {CAMPAIGN_COPY.list.searchLabel}
            </label>
            <Input
              id="campaign-search"
              onChange={onSearchChange}
              placeholder={CAMPAIGN_COPY.list.searchPlaceholder}
              type="search"
              value={search}
            />
            <p className="text-xs text-on-surface-variant">{CAMPAIGN_COPY.helper.debounce}</p>
          </div>
        </div>
      </div>
    </div>
  </Card>
)
