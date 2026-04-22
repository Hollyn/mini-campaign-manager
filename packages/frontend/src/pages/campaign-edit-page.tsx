import { useParams } from 'react-router-dom'

import { Alert } from '../components/ui/alert'
import { CampaignFormPanel } from '../components/campaigns/campaign-form-panel'
import { CampaignListSkeleton } from '../components/campaigns/campaign-list-skeleton'
import { PageBackLink } from '../components/ui/page-back-link'
import { useCampaignFormPage } from '../hooks/use-campaign-form-page'

export const CampaignEditPage = () => {
  const params = useParams<{ id: string }>()
  const page = useCampaignFormPage(params.id)

  if (page.isLoading) {
    return <CampaignListSkeleton />
  }

  return (
    <div className="space-y-8">
      <PageBackLink label="Back to Campaigns" onClick={page.onBack} />
      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}
      <CampaignFormPanel
        errorMessage={page.formErrorMessage}
        formValues={page.formValues}
        isReadonly={page.isReadonly}
        isRecipientOptionsLoading={page.isRecipientOptionsLoading}
        isSubmitting={page.isSubmitting}
        mode={page.mode}
        onBack={page.onBack}
        onBodyChange={page.handleBodyChange}
        onFieldChange={page.handleFieldChange}
        onRecipientSearchChange={page.handleRecipientSearchChange}
        onRecipientToggle={page.handleRecipientToggle}
        onSubmit={page.handleSubmit}
        recipientOptions={page.recipientOptions}
        recipientSearch={page.recipientSearch}
        selectedRecipients={page.selectedRecipients}
      />
    </div>
  )
}
