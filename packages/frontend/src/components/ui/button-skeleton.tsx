import { HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'
import { Skeleton } from './skeleton'

export const ButtonSkeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    aria-label="Loading action"
    className={cn(
      'inline-flex min-h-12 items-center gap-2 rounded-md border border-white/60 bg-surface-container-low px-4 py-3',
      className
    )}
    role="status"
    {...props}
  >
    <Skeleton className="h-4 w-4 rounded-full" />
    <Skeleton className="h-4 w-24" />
  </div>
)
