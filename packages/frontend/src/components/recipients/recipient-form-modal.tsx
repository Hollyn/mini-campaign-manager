import { ChangeEvent, FormEventHandler } from 'react'

import { CreateRecipientRequest } from '../../api/types'
import { RECIPIENT_COPY, RECIPIENT_FORM_FIELDS } from '../../constants/recipients'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface RecipientFormModalProps {
  errorMessage: string | null
  isOpen: boolean
  isPending: boolean
  mode: 'create' | 'edit'
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onSubmit: FormEventHandler<HTMLFormElement>
  values: CreateRecipientRequest
}

export const RecipientFormModal = ({
  errorMessage,
  isOpen,
  isPending,
  mode,
  onChange,
  onClose,
  onSubmit,
  values
}: RecipientFormModalProps) => {
  const description = mode === 'edit' ? RECIPIENT_COPY.form.editDescription : RECIPIENT_COPY.form.createDescription
  const submitLabel = mode === 'edit' ? RECIPIENT_COPY.actions.save : RECIPIENT_COPY.actions.add
  const pendingLabel = mode === 'edit' ? RECIPIENT_COPY.states.saving : RECIPIENT_COPY.states.creating
  const title = mode === 'edit' ? RECIPIENT_COPY.form.editTitle : RECIPIENT_COPY.form.createTitle

  return (
    <Dialog
      description={description}
      eyebrow={RECIPIENT_COPY.form.eyebrow}
      footer={
        <>
          <Button onClick={onClose} type="button" variant="tertiary">
            {RECIPIENT_COPY.actions.cancel}
          </Button>
          <Button type="submit" form="recipient-form">
            {isPending ? pendingLabel : submitLabel}
          </Button>
        </>
      }
      isOpen={isOpen}
      onClose={onClose}
      title={title}
    >
      <form className="space-y-5" id="recipient-form" onSubmit={onSubmit}>
        {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}

        {RECIPIENT_FORM_FIELDS.map((field) => (
          <div className="space-y-2" key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              autoComplete={field.autoComplete}
              id={field.name}
              name={field.name}
              onChange={onChange}
              placeholder={field.placeholder}
              type={field.type}
              value={values[field.name]}
            />
          </div>
        ))}
      </form>
    </Dialog>
  )
}
