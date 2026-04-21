import { Skeleton } from '../ui/skeleton'

export const CampaignDetailSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-40 rounded-[1.75rem]" />
    <div className="grid gap-4 xl:grid-cols-2">
      <Skeleton className="h-32 rounded-[1.5rem]" />
      <Skeleton className="h-32 rounded-[1.5rem]" />
    </div>
    <Skeleton className="h-80 rounded-[1.75rem]" />
  </div>
)
