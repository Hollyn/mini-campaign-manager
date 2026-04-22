import { HTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'rounded-md bg-surface-container-lowest shadow-ambient',
      className
    )}
    {...props}
  />
)
