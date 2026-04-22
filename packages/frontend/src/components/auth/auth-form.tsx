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
  alternatePrompt: string
  alternateActionLabel: string
  alternateTo: string
  description: string
  eyebrow: string
  errorMessage: string | null
  footerHint: string
  fields: readonly AuthFormField[]
  isPending: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onSubmit: FormEventHandler<HTMLFormElement>
  submitLabel: string
  submittingLabel: string
  title: string
  values: {
    email?: string
    name?: string
    password?: string
  }
}

export const AuthForm = ({
  alternatePrompt,
  alternateActionLabel,
  alternateTo,
  description,
  eyebrow,
  errorMessage,
  footerHint,
  fields,
  isPending,
  onChange,
  onSubmit,
  submitLabel,
  submittingLabel,
  title,
  values
}: AuthFormProps) => (
  <div className="space-y-6 rounded-[1.5rem] border border-white/70 bg-surface-container-lowest/90 p-6 shadow-[var(--shadow-auth-card)] backdrop-blur-xl sm:p-8">
    <div aria-hidden className="flex justify-center">
      <span className="relative flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(211,228,254,0.78))] shadow-sm shadow-primary/10 ring-1 ring-white/80">
        <span className="h-7 w-7 rounded-[0.95rem] border border-primary/15 bg-white/85" />
        <span className="absolute h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_0_8px_rgba(0,83,220,0.08)]" />
      </span>
    </div>

    <div className="space-y-2 text-center">
      <p className="text-[0.72rem] font-medium tracking-[0.08em] text-on-surface-variant">
        {eyebrow}
      </p>
      <div className="space-y-2">
        <h1 className="font-body text-[2rem] font-medium leading-none tracking-tight text-on-background sm:text-[2.25rem]">
          {title}
        </h1>
        <p className="mx-auto max-w-sm text-sm leading-6 text-on-surface-variant">{description}</p>
      </div>
    </div>

    {errorMessage ? <AuthErrorBanner message={errorMessage} /> : null}

    <form aria-busy={isPending} className="space-y-3.5" onSubmit={onSubmit}>
      {fields.map((field, index) => (
        <div className="space-y-2" key={field.name}>
          <Label className="sr-only" htmlFor={field.name}>
            {field.label}
          </Label>
          <Input
            autoComplete={field.autoComplete}
            autoFocus={index === 0}
            className="h-12 rounded-xl border border-transparent bg-white/90 px-4 text-[0.95rem] shadow-sm placeholder:text-on-surface-variant/55 focus-visible:border-primary/20 focus-visible:ring-primary/30"
            disabled={isPending}
            id={field.name}
            name={field.name}
            onChange={onChange}
            placeholder={field.placeholder}
            type={field.type}
            value={values[field.name] ?? ''}
          />
        </div>
      ))}

      <Button className="h-12 w-full rounded-xl text-sm font-semibold shadow-sm" disabled={isPending} type="submit">
        {isPending ? submittingLabel : submitLabel}
      </Button>
    </form>

    <div className="space-y-2 text-center">
      <p className="text-[0.72rem] font-medium tracking-[0.08em] text-on-surface-variant/80">{footerHint}</p>
      <p className="text-sm text-on-surface-variant">
        {alternatePrompt}{' '}
        <Link className="font-medium text-primary transition-colors hover:text-primary-dim" to={alternateTo}>
          {alternateActionLabel}
        </Link>
      </p>
    </div>
  </div>
)
