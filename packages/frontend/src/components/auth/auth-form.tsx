import { ChangeEventHandler, FormEventHandler } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthErrorBanner } from './auth-error-banner'

interface AuthFormField {
  autoComplete: string
  label: string
  name: 'email' | 'name' | 'password'
  placeholder: string
  type: string
}

interface AuthFormProps {
  alternateActionLabel: string
  alternatePrompt: string
  alternateTo: string
  errorMessage: string | null
  fields: readonly AuthFormField[]
  footerHint: string
  isPending: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitLabel: string
  submittingLabel: string
  values: {
    email?: string
    name?: string
    password?: string
  }
}

export const AuthForm = ({
  alternateActionLabel,
  alternatePrompt,
  alternateTo,
  errorMessage,
  fields,
  footerHint,
  isPending,
  onChange,
  onSubmit,
  submitLabel,
  submittingLabel,
  values
}: AuthFormProps) => (
  <div className="space-y-8 rounded-md bg-surface-container-lowest p-8 shadow-ambient sm:p-10">
    {errorMessage ? <AuthErrorBanner message={errorMessage} /> : null}

    <form className="space-y-6" onSubmit={onSubmit}>
      {fields.map((field) => (
        <div className="space-y-2" key={field.name}>
          <Label htmlFor={field.name}>{field.label}</Label>
          <Input
            autoComplete={field.autoComplete}
            id={field.name}
            name={field.name}
            onChange={onChange}
            placeholder={field.placeholder}
            type={field.type}
            value={values[field.name] ?? ''}
          />
        </div>
      ))}

      <Button className="w-full" type="submit">
        {isPending ? submittingLabel : submitLabel}
      </Button>
    </form>

    <div className="space-y-3 text-sm text-on-surface-variant">
      <p>{footerHint}</p>
      <p>
        {alternatePrompt}{' '}
        <Link className="font-medium text-primary transition-colors hover:text-primary-dim" to={alternateTo}>
          {alternateActionLabel}
        </Link>
      </p>
    </div>
  </div>
)
