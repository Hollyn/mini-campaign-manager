import { AuthForm } from '../components/auth/auth-form'
import { AuthLayout } from '../components/auth/auth-layout'
import { AUTH_COPY, AUTH_FORM_FIELDS, AUTH_ROUTES } from '../constants/auth'
import { useRegister } from '../hooks/use-register'

export const RegisterPage = () => {
  const register = useRegister()

  return (
    <AuthLayout description={AUTH_COPY.register.description} title={AUTH_COPY.register.title}>
      <AuthForm
        alternateActionLabel={AUTH_COPY.register.alternateActionLabel}
        alternatePrompt={AUTH_COPY.register.alternatePrompt}
        alternateTo={AUTH_ROUTES.login}
        errorMessage={register.errorMessage}
        fields={AUTH_FORM_FIELDS.register}
        footerHint={AUTH_COPY.register.footerHint}
        isPending={register.isPending}
        onChange={register.handleChange}
        onSubmit={register.handleSubmit}
        submitLabel={AUTH_COPY.register.submitLabel}
        submittingLabel={AUTH_COPY.register.pendingLabel}
        values={register.values}
      />
    </AuthLayout>
  )
}
