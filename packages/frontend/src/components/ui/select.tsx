import { forwardRef, SelectHTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'w-full rounded-xl border-0 bg-surface-container-highest px-4 py-3 pr-10 text-sm text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className
      )}
      {...props}
    />
  )
)

Select.displayName = 'Select'
