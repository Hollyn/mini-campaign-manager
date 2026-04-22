import { HTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const alertVariants = cva('rounded-md p-4 text-sm', {
  defaultVariants: {
    variant: 'default'
  },
  variants: {
    variant: {
      default: 'bg-surface-container-high text-on-surface',
      destructive: 'bg-error-container text-on-error-container'
    }
  }
})

type AlertProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>

export const Alert = ({ className, variant, ...props }: AlertProps) => (
  <div className={cn(alertVariants({ className, variant }))} role="alert" {...props} />
)
