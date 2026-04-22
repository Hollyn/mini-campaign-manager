import { create } from 'zustand'

import { AuthUser } from '../api/types'

interface AuthStore {
  clearAuth: () => void
  hydrateAuth: (user: AuthUser) => void
  isHydrated: boolean
  setAuth: (token: string, user: AuthUser) => void
  token: string | null
  user: AuthUser | null
}

export const useAuthStore = create<AuthStore>((set) => ({
  clearAuth: () => {
    set({
      isHydrated: true,
      token: null,
      user: null
    })
  },
  hydrateAuth: (user) => {
    set((state) => ({
      isHydrated: true,
      token: state.token,
      user
    }))
  },
  isHydrated: false,
  setAuth: (token, user) => {
    set({
      isHydrated: true,
      token,
      user
    })
  },
  token: null,
  user: null
}))
