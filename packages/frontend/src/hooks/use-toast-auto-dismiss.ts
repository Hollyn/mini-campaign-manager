import { useEffect } from 'react'

import { useToastStore } from '../store/toast-store'

export const useToastAutoDismiss = (toastId: string, duration: number) => {
  const dismissToast = useToastStore((state) => state.dismissToast)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      dismissToast(toastId)
    }, duration)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [dismissToast, duration, toastId])

  return {
    handleDismiss: () => dismissToast(toastId)
  }
}
