import { forwardRef, TextareaHTMLAttributes } from 'react'

import { cn } from '../../lib/utils'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'min-h-[160px] w-full rounded-md border-0 bg-surface-container-highest px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
        className
      )}
      {...props}
    />
  )
)

Textarea.displayName = 'Textarea'
