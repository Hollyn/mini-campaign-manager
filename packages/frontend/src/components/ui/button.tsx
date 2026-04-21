import { ButtonHTMLAttributes } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:pointer-events-none disabled:opacity-60',
  {
    defaultVariants: {
      variant: 'primary'
    },
    variants: {
      variant: {
        primary: 'bg-primary text-on-primary hover:bg-primary-dim',
        secondary:
          'bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed-dim',
        tertiary: 'bg-transparent text-primary hover:bg-primary/10'
      }
    }
  }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>

export const Button = ({ className, variant, ...props }: ButtonProps) => (
  <button className={cn(buttonVariants({ className, variant }))} {...props} />
)
