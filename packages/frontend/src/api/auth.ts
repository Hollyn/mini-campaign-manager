import { apiRequest } from './client'
import { AuthResponse, LoginRequest, RegisterRequest } from './types'

export const getCurrentUser = () => apiRequest<AuthResponse>('/auth/me')

export const login = (payload: LoginRequest) =>
  apiRequest<AuthResponse>('/auth/login', {
    body: JSON.stringify(payload),
    method: 'POST'
  })

export const logout = () =>
  apiRequest<void>('/auth/logout', {
    method: 'POST'
  })

export const register = (payload: RegisterRequest) =>
  apiRequest<AuthResponse>('/auth/register', {
    body: JSON.stringify(payload),
    method: 'POST'
  })
