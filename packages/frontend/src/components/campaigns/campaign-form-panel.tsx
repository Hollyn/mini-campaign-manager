import { ChangeEvent, FormEventHandler } from 'react'

import { CampaignStatus, CreateCampaignRequest } from '../../api/types'
import { CAMPAIGN_COPY, CAMPAIGN_FORM_FIELDS } from '../../constants/campaigns'
import { Alert } from '../ui/alert'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { CampaignRecipientPicker } from './campaign-recipient-picker'
import { CampaignStatusBadge } from './campaign-status-badge'

interface RecipientOption {
  email: string
  id: string
  name: string
}

interface CampaignFormPanelProps {
  campaignName: string
  errorMessage: string | null
  formValues: CreateCampaignRequest
  isReadonly: boolean
  isRecipientOptionsLoading: boolean
  isSubmitting: boolean
  mode: 'create' | 'edit'
  onBack: () => void
  onFieldChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onRecipientSearchChange: (event: ChangeEvent<HTMLInputElement>) => void
  onRecipientToggle: (recipient: RecipientOption) => void
  onSubmit: FormEventHandler<HTMLFormElement>
  recipientOptions: RecipientOption[]
  recipientSearch: string
  selectedRecipients: RecipientOption[]
  status: CampaignStatus
}

export const CampaignFormPanel = ({
  campaignName,
  errorMessage,
  formValues,
  isReadonly,
  isRecipientOptionsLoading,
  isSubmitting,
  mode,
  onBack,
  onFieldChange,
  onRecipientSearchChange,
  onRecipientToggle,
  onSubmit,
  recipientOptions,
  recipientSearch,
  selectedRecipients,
  status
}: CampaignFormPanelProps) => {
  const title = mode === 'edit' ? CAMPAIGN_COPY.form.editTitle : CAMPAIGN_COPY.form.createTitle
  const description = mode === 'edit' ? CAMPAIGN_COPY.form.editDescription : CAMPAIGN_COPY.form.createDescription
  const submitLabel = mode === 'edit' ? CAMPAIGN_COPY.actions.save : CAMPAIGN_COPY.actions.create
  const pendingLabel = mode === 'edit' ? CAMPAIGN_COPY.states.saving : CAMPAIGN_COPY.states.creating

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-[2rem] border border-white/70 bg-[linear-gradient(145deg,rgba(214,228,255,0.96),rgba(255,255,255,0.96)_55%,rgba(236,243,255,0.98))] px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <button className="text-[0.72rem] font-medium uppercase tracking-[0.32em] text-primary" onClick={onBack} type="button">
              {CAMPAIGN_COPY.actions.back}
            </button>
            <div className="space-y-3">
              <h1 className="text-4xl font-medium tracking-tight text-on-background sm:text-[3.2rem]">{title}</h1>
              <p className="max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">{description}</p>
            </div>
          </div>

          {mode === 'edit' ? (
            <div className="space-y-3 rounded-[1.5rem] bg-white/80 px-5 py-4 shadow-[0_18px_50px_rgba(31,49,89,0.08)] backdrop-blur">
              <p className="text-[0.7rem] uppercase tracking-[0.26em] text-on-surface-variant">Current status</p>
              <CampaignStatusBadge status={status} />
              <p className="text-sm text-on-surface-variant">{campaignName}</p>
            </div>
          ) : null}
        </div>
      </Card>

      <form className="space-y-6" onSubmit={onSubmit}>
        {errorMessage ? <Alert variant="destructive">{errorMessage}</Alert> : null}
        {isReadonly ? <Alert variant="destructive">Only draft campaigns can be edited.</Alert> : null}

        <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7">
          <div className="grid gap-5 lg:grid-cols-2">
            {CAMPAIGN_FORM_FIELDS.map((field) => (
              <div className="space-y-2" key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Input
                  autoComplete={field.autoComplete}
                  disabled={isReadonly}
                  id={field.name}
                  name={field.name}
                  onChange={onFieldChange}
                  placeholder={field.placeholder}
                  type={field.type}
                  value={formValues[field.name]}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7">
          <div className="space-y-2">
            <Label htmlFor="body">{CAMPAIGN_COPY.form.bodyLabel}</Label>
            <p className="text-sm text-on-surface-variant">{CAMPAIGN_COPY.form.bodyDescription}</p>
          </div>
          <Textarea
            className="mt-4"
            disabled={isReadonly}
            id="body"
            name="body"
            onChange={onFieldChange}
            placeholder="Write campaign copy here"
            value={formValues.body}
          />
        </Card>

        <Card className="rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95 p-6 sm:p-7">
          <div className="space-y-2">
            <Label htmlFor="recipient-search">{CAMPAIGN_COPY.form.recipientLabel}</Label>
            <p className="text-sm text-on-surface-variant">{CAMPAIGN_COPY.form.recipientHelper}</p>
          </div>

          <div className="mt-5">
            <CampaignRecipientPicker
              isLoading={isRecipientOptionsLoading}
              onRecipientSearchChange={onRecipientSearchChange}
              onRecipientToggle={onRecipientToggle}
              recipientOptions={recipientOptions}
              recipientSearch={recipientSearch}
              selectedRecipients={selectedRecipients}
            />
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onBack} type="button" variant="tertiary">
            {CAMPAIGN_COPY.actions.cancel}
          </Button>
          <Button disabled={isReadonly || isSubmitting} type="submit">
            {isSubmitting ? pendingLabel : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  )
}
