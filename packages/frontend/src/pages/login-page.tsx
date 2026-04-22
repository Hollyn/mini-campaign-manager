import { AuthForm } from '../components/auth/auth-form'
import { AuthLayout } from '../components/auth/auth-layout'
import { AUTH_COPY, AUTH_FORM_FIELDS, AUTH_ROUTES } from '../constants/auth'
import { useLogin } from '../hooks/use-login'

export const LoginPage = () => {
  const login = useLogin()

  return (
    <AuthLayout>
      <AuthForm
        alternatePrompt={AUTH_COPY.login.alternatePrompt}
        alternateActionLabel={AUTH_COPY.login.alternateActionLabel}
        alternateTo={AUTH_ROUTES.register}
        description={AUTH_COPY.login.description}
        eyebrow={AUTH_COPY.eyebrow}
        errorMessage={login.errorMessage}
        footerHint={AUTH_COPY.login.footerHint}
        fields={AUTH_FORM_FIELDS.login}
        isPending={login.isPending}
        onChange={login.handleChange}
        onSubmit={login.handleSubmit}
        submitLabel={AUTH_COPY.login.submitLabel}
        submittingLabel={AUTH_COPY.login.pendingLabel}
        title={AUTH_COPY.login.title}
        values={login.values}
      />
    </AuthLayout>
  )
}
