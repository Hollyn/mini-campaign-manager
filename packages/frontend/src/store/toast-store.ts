import { create } from 'zustand'

import { TOAST_DURATION_MS, TOAST_LIMIT } from '../constants/toast'

export type ToastVariant = 'destructive'

export interface ToastRecord {
  description: string
  duration: number
  id: string
  title: string
  variant: ToastVariant
}

interface CreateToastInput {
  description: string
  duration?: number
  title: string
  variant?: ToastVariant
}

interface ToastStore {
  dismissToast: (toastId: string) => void
  pushToast: (toast: CreateToastInput) => void
  toasts: ToastRecord[]
}

const createToastId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export const useToastStore = create<ToastStore>((set) => ({
  dismissToast: (toastId) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== toastId)
    }))
  },
  pushToast: ({ description, duration = TOAST_DURATION_MS, title, variant = 'destructive' }) => {
    const nextToast: ToastRecord = {
      description,
      duration,
      id: createToastId(),
      title,
      variant
    }

    set((state) => ({
      toasts: [nextToast, ...state.toasts].slice(0, TOAST_LIMIT)
    }))
  },
  toasts: []
}))

export const pushToast = (toast: CreateToastInput) => {
  useToastStore.getState().pushToast(toast)
}
