import { Skeleton } from '../ui/skeleton'

export const RecipientListSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-28 rounded-[1.75rem]" />
    <div className="rounded-[1.75rem] bg-surface-container-lowest p-6 shadow-ambient">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-16 w-full" />
      </div>
    </div>
  </div>
)
