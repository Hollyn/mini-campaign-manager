import { apiRequest } from './client'
import { AuthResponse, AuthSessionResponse, LoginRequest, RegisterRequest } from './types'

export const getCurrentUser = () => apiRequest<AuthResponse>('/auth/me')

export const login = (payload: LoginRequest) =>
  apiRequest<AuthSessionResponse>('/auth/login', {
    body: JSON.stringify(payload),
    method: 'POST'
  })

export const logout = () =>
  apiRequest<void>('/auth/logout', {
    method: 'POST'
  })

export const register = (payload: RegisterRequest) =>
  apiRequest<AuthSessionResponse>('/auth/register', {
    body: JSON.stringify(payload),
    method: 'POST'
  })
