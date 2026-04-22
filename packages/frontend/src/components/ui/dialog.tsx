import { MouseEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { cn } from '../../lib/utils'

interface DialogProps {
  children: ReactNode
  description?: string
  eyebrow?: string
  footer?: ReactNode
  isOpen: boolean
  onClose: () => void
  title: string
}

export const Dialog = ({ children, description, eyebrow, footer, isOpen, onClose, title }: DialogProps) => {
  if (!isOpen) {
    return null
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-on-background/35 px-4 py-6 backdrop-blur-sm"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="w-full max-w-lg rounded-[1.5rem] border border-white/60 bg-surface-container-lowest p-6 shadow-[0_32px_80px_rgba(31,49,89,0.18)] sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            {eyebrow ? <p className="text-[0.72rem] font-medium tracking-[0.08em] text-primary">{eyebrow}</p> : null}
            <h2 className="text-2xl font-medium tracking-tight text-on-background">{title}</h2>
            {description ? <p className="text-sm leading-6 text-on-surface-variant">{description}</p> : null}
          </div>
          <button
            aria-label="Close dialog"
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high text-lg text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-on-surface'
            )}
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <div className="mt-6">{children}</div>

        {footer ? <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">{footer}</div> : null}
      </div>
    </div>,
    document.body
  )
}
