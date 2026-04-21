import { create } from 'zustand'

import { AuthUser } from '../api/types'

interface AuthStore {
  clearAuth: () => void
  isAuthenticated: boolean
  isBootstrapped: boolean
  setAuth: (user: AuthUser) => void
  user: AuthUser | null
}

export const useAuthStore = create<AuthStore>((set) => ({
  clearAuth: () => {
    set({
      isAuthenticated: false,
      isBootstrapped: true,
      user: null
    })
  },
  isAuthenticated: false,
  isBootstrapped: false,
  setAuth: (user) => {
    set({
      isAuthenticated: true,
      isBootstrapped: true,
      user
    })
  },
  user: null
}))
