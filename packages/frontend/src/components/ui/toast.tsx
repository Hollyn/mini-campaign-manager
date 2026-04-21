import { TOAST_COPY } from '../../constants/toast'
import { useToastAutoDismiss } from '../../hooks/use-toast-auto-dismiss'
import { cn } from '../../lib/utils'
import { ToastRecord } from '../../store/toast-store'

const TOAST_VARIANT_STYLES = {
  destructive:
    'border-[color:rgba(250,116,111,0.32)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(250,116,111,0.16))] text-on-surface shadow-[0_20px_45px_rgba(31,49,89,0.12)]'
} as const

interface ToastProps {
  toast: ToastRecord
}

export const Toast = ({ toast }: ToastProps) => {
  const { handleDismiss } = useToastAutoDismiss(toast.id, toast.duration)

  return (
    <div
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex w-full items-start gap-4 rounded-[1.5rem] border p-4 backdrop-blur animate-[toast-in_220ms_ease-out]',
        TOAST_VARIANT_STYLES[toast.variant]
      )}
      role="alert"
    >
      <div className="min-w-0 flex-1 space-y-1">
        <p className="text-sm font-semibold tracking-tight text-on-background">{toast.title}</p>
        <p className="text-sm leading-6 text-on-surface-variant">{toast.description}</p>
      </div>

      <button
        aria-label={TOAST_COPY.dismiss}
        className="shrink-0 rounded-full px-3 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-on-surface-variant transition-colors hover:bg-white/60 hover:text-on-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
        onClick={handleDismiss}
        type="button"
      >
        {TOAST_COPY.dismiss}
      </button>
    </div>
  )
}
