import { Skeleton } from '../ui/skeleton'

export const CampaignDetailSkeleton = () => (
  <div className="space-y-4">
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <Skeleton className="h-6 w-36 rounded-full" />
      <Skeleton className="h-10 w-full max-w-md rounded-[1rem]" />
    </div>
    <Skeleton className="h-28 rounded-[1.5rem]" />
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(280px,0.9fr)]">
      <Skeleton className="h-52 rounded-[1.5rem]" />
      <Skeleton className="h-72 rounded-[1.5rem]" />
    </div>
    <Skeleton className="h-[30rem] rounded-[1.5rem]" />
  </div>
)
