import { AuthForm } from '../components/auth/auth-form'
import { AuthLayout } from '../components/auth/auth-layout'
import { AUTH_COPY, AUTH_FORM_FIELDS, AUTH_ROUTES } from '../constants/auth'
import { useRegister } from '../hooks/use-register'

export const RegisterPage = () => {
  const register = useRegister()

  return (
    <AuthLayout>
      <AuthForm
        alternatePrompt={AUTH_COPY.register.alternatePrompt}
        alternateActionLabel={AUTH_COPY.register.alternateActionLabel}
        alternateTo={AUTH_ROUTES.login}
        description={AUTH_COPY.register.description}
        eyebrow={AUTH_COPY.eyebrow}
        errorMessage={register.errorMessage}
        footerHint={AUTH_COPY.register.footerHint}
        fields={AUTH_FORM_FIELDS.register}
        isPending={register.isPending}
        onChange={register.handleChange}
        onSubmit={register.handleSubmit}
        submitLabel={AUTH_COPY.register.submitLabel}
        submittingLabel={AUTH_COPY.register.pendingLabel}
        title={AUTH_COPY.register.title}
        values={register.values}
      />
    </AuthLayout>
  )
}
