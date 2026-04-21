import { HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-lg border border-border/70 bg-card/90 p-6 shadow-glow backdrop-blur-sm',
      className
    )}
    {...props}
  />
)
