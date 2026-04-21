import { LabelHTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      'text-[0.75rem] font-medium uppercase tracking-[0.28em] text-on-surface',
      className
    )}
    {...props}
  />
)
