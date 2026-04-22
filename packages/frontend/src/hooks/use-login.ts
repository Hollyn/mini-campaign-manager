import { ChangeEvent, FormEvent, useMemo, useState } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { login } from '../api/auth'
import { ApiRequestError } from '../api/client'
import { LoginRequest } from '../api/types'
import { AUTH_COPY, AUTH_ROUTES } from '../constants/auth'
import { useAuthStore } from '../store/auth-store'

const initialValues: LoginRequest = {
  email: '',
  password: ''
}

export const useLogin = () => {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [values, setValues] = useState<LoginRequest>(initialValues)

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      setAuth(response.token, response.user)
      navigate(AUTH_ROUTES.campaigns, { replace: true })
    }
  })

  const errorMessage = useMemo(() => {
    if (!mutation.error) {
      return null
    }

    if (mutation.error instanceof ApiRequestError) {
      return mutation.error.message
    }

    return AUTH_COPY.genericError
  }, [mutation.error])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutation.mutate(values)
  }

  return {
    errorMessage,
    handleChange,
    handleSubmit,
    isPending: mutation.isPending,
    values
  }
}
