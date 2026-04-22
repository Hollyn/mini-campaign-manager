import { ChangeEvent, FormEvent, useMemo, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { register } from '../api/auth'
import { ApiRequestError } from '../api/client'
import { RegisterRequest } from '../api/types'
import { AUTH_COPY, AUTH_QUERY_KEYS, AUTH_ROUTES } from '../constants/auth'
import { useAuthStore } from '../store/auth-store'

const initialValues: RegisterRequest = {
  email: '',
  name: '',
  password: ''
}

export const useRegister = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const setAuth = useAuthStore((state) => state.setAuth)
  const [values, setValues] = useState<RegisterRequest>(initialValues)

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: (response) => {
      queryClient.setQueryData(AUTH_QUERY_KEYS.session, {
        user: response.user
      })
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
