import { AuthForm } from '../components/auth/auth-form'
import { AuthLayout } from '../components/auth/auth-layout'
import { AUTH_COPY, AUTH_FORM_FIELDS, AUTH_ROUTES } from '../constants/auth'
import { useLogin } from '../hooks/use-login'

export const LoginPage = () => {
  const login = useLogin()

  return (
    <AuthLayout description={AUTH_COPY.login.description} title={AUTH_COPY.login.title}>
      <AuthForm
        alternateActionLabel={AUTH_COPY.login.alternateActionLabel}
        alternatePrompt={AUTH_COPY.login.alternatePrompt}
        alternateTo={AUTH_ROUTES.register}
        errorMessage={login.errorMessage}
        fields={AUTH_FORM_FIELDS.login}
        footerHint={AUTH_COPY.login.footerHint}
        isPending={login.isPending}
        onChange={login.handleChange}
        onSubmit={login.handleSubmit}
        submitLabel={AUTH_COPY.login.submitLabel}
        submittingLabel={AUTH_COPY.login.pendingLabel}
        values={login.values}
      />
    </AuthLayout>
  )
}
