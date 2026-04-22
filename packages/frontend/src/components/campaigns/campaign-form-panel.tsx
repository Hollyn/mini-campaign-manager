import { ChangeEvent, FormEventHandler } from 'react'

import { CreateCampaignRequest } from '../../api/types'
import { CAMPAIGN_COPY, CAMPAIGN_FORM_FIELDS } from '../../constants/campaigns'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { RichTextEditor } from '../ui/rich-text-editor'
import { CampaignRecipientPicker } from './campaign-recipient-picker'

interface RecipientOption {
  email: string
  id: string
  name: string
}

interface CreateRecipientCandidate {
  email: string
  name: string
}

interface CampaignFormFieldErrors {
  body?: string
  name?: string
  recipientIds?: string
  subject?: string
}

interface CampaignFormPanelProps {
  createRecipientCandidate: CreateRecipientCandidate | null
  createRecipientErrorMessage: string | null
  errorMessage: string | null
  fieldErrors: CampaignFormFieldErrors
  formValues: CreateCampaignRequest
  isCreatingRecipient: boolean
  isReadonly: boolean
  isRecipientOptionsLoading: boolean
  isSubmitting: boolean
  mode: 'create' | 'edit'
  onBack: () => void
  onBodyChange: (value: string) => void
  onCreateRecipient: () => void
  onFieldChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onRecipientSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRecipientToggle: (recipient: RecipientOption) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  recipientOptions: RecipientOption[]
  recipientSearch: string
  selectedRecipients: RecipientOption[]
}

export const CampaignFormPanel = ({
  createRecipientCandidate,
  createRecipientErrorMessage,
  errorMessage,
  fieldErrors,
  formValues,
  isCreatingRecipient,
  isReadonly,
  isRecipientOptionsLoading,
  isSubmitting,
  mode,
  onBack,
  onBodyChange,
  onCreateRecipient,
  onFieldChange,
  onRecipientSearchChange,
  onRecipientToggle,
  onSubmit,
  recipientOptions,
  recipientSearch,
  selectedRecipients
}: CampaignFormPanelProps) => {
  const campaignNameField = CAMPAIGN_FORM_FIELDS[0]
  const campaignSubjectField = CAMPAIGN_FORM_FIELDS[1]
  const submitLabel = mode === 'edit' ? CAMPAIGN_COPY.actions.save : CAMPAIGN_COPY.actions.create
  const pendingLabel = mode === 'edit' ? CAMPAIGN_COPY.states.saving : CAMPAIGN_COPY.states.creating

  return (
    <div className="space-y-6">

      <form className="space-y-6" onSubmit={onSubmit}>
        {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
        {isReadonly ? <Alert variant="destructive">Only draft campaigns can be edited.</Alert> : null}

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="space-y-6">
            <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7">
              <div className="space-y-5">
                <p className="text-sm font-medium text-on-background">{CAMPAIGN_COPY.form.campaignPaneTitle}</p>

                <div className="space-y-2">
                  <Label htmlFor={campaignNameField.name}>{campaignNameField.label}</Label>
                  <Input
                    aria-invalid={Boolean(fieldErrors.name)}
                    autoComplete={campaignNameField.autoComplete}
                    disabled={isReadonly}
                    id={campaignNameField.name}
                    name={campaignNameField.name}
                    onChange={onFieldChange}
                    placeholder={campaignNameField.placeholder}
                    type={campaignNameField.type}
                    value={formValues[campaignNameField.name]}
                  />
                  {fieldErrors.name ? <p className="text-sm text-red-700">{fieldErrors.name}</p> : null}
                </div>
              </div>
            </Card>

            <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7">
              <div className="space-y-5">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-on-background">{CAMPAIGN_COPY.form.bodyPaneTitle}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={campaignSubjectField.name}>{campaignSubjectField.label}</Label>
                  <Input
                    aria-invalid={Boolean(fieldErrors.subject)}
                    autoComplete={campaignSubjectField.autoComplete}
                    disabled={isReadonly}
                    id={campaignSubjectField.name}
                    name={campaignSubjectField.name}
                    onChange={onFieldChange}
                    placeholder={campaignSubjectField.placeholder}
                    type={campaignSubjectField.type}
                    value={formValues[campaignSubjectField.name]}
                  />
                  {fieldErrors.subject ? <p className="text-sm text-red-700">{fieldErrors.subject}</p> : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body">{CAMPAIGN_COPY.form.bodyLabel}</Label>

                  <RichTextEditor
                    actions={[
                      { command: 'bold', label: CAMPAIGN_COPY.form.editorActions.bold },
                      { command: 'italic', label: CAMPAIGN_COPY.form.editorActions.italic },
                      { command: 'underline', label: CAMPAIGN_COPY.form.editorActions.underline },
                      { command: 'formatBlock', label: CAMPAIGN_COPY.form.editorActions.heading, value: 'h2' },
                      { command: 'insertUnorderedList', label: CAMPAIGN_COPY.form.editorActions.bulletList },
                      { command: 'insertOrderedList', label: CAMPAIGN_COPY.form.editorActions.orderedList },
                      { command: 'formatBlock', label: CAMPAIGN_COPY.form.editorActions.quote, value: 'blockquote' }
                    ]}
                    disabled={isReadonly}
                    onChange={onBodyChange}
                    placeholder={CAMPAIGN_COPY.form.bodyPlaceholder}
                    value={formValues.body}
                  />
                  {fieldErrors.body ? <p className="text-sm text-red-700">{fieldErrors.body}</p> : null}
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7 xl:sticky xl:top-4 xl:max-h-[calc(100vh-7rem)]">
              <div className="flex min-h-0 flex-col gap-5 xl:h-full">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-medium text-on-background">{CAMPAIGN_COPY.form.recipientPaneTitle}</p>
                  <span className="text-sm text-on-surface-variant">{CAMPAIGN_COPY.form.selectedCount(selectedRecipients.length)}</span>
                </div>

                <CampaignRecipientPicker
                  createRecipientCandidate={createRecipientCandidate}
                  createRecipientErrorMessage={createRecipientErrorMessage}
                  isLoading={isRecipientOptionsLoading}
                  isCreatingRecipient={isCreatingRecipient}
                  onCreateRecipient={onCreateRecipient}
                  onRecipientSearchChange={onRecipientSearchChange}
                  onRecipientToggle={onRecipientToggle}
                  recipientOptions={recipientOptions}
                  recipientSearch={recipientSearch}
                  selectedRecipients={selectedRecipients}
                />
                {fieldErrors.recipientIds ? <p className="text-sm text-red-700">{fieldErrors.recipientIds}</p> : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <Button onClick={onBack} type="button" variant="tertiary">
                    {CAMPAIGN_COPY.actions.cancel}
                  </Button>
                  <Button disabled={isReadonly || isSubmitting} type="submit">
                    {isSubmitting ? pendingLabel : submitLabel}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </form>
    </div>
  )
}
