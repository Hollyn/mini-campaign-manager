import { LabelHTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cn(
      'text-[0.75rem] font-medium tracking-[0.08em] text-on-surface',
      className
    )}
    {...props}
  />
)
