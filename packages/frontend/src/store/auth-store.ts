import { create } from 'zustand'

import { AuthUser } from '../api/types'

interface AuthStore {
  clearAuth: () => void
  setAuth: (token: string, user: AuthUser) => void
  token: string | null
  user: AuthUser | null
}

export const useAuthStore = create<AuthStore>((set) => ({
  clearAuth: () => {
    set({
      token: null,
      user: null
    })
  },
  setAuth: (token, user) => {
    set({
      token,
      user
    })
  },
  token: null,
  user: null
}))
