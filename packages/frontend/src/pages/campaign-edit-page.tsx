import { useParams } from 'react-router-dom'

import { Alert } from '../components/ui/alert'
import { CampaignFormPanel } from '../components/campaigns/campaign-form-panel'
import { CampaignListSkeleton } from '../components/campaigns/campaign-list-skeleton'
import { useCampaignFormPage } from '../hooks/use-campaign-form-page'

export const CampaignEditPage = () => {
  const params = useParams<{ id: string }>()
  const page = useCampaignFormPage(params.id)

  if (page.isLoading) {
    return <CampaignListSkeleton />
  }

  return (
    <div className="space-y-6">
      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}
      <CampaignFormPanel
        campaignName={page.campaignName}
        errorMessage={page.formErrorMessage}
        formValues={page.formValues}
        isReadonly={page.isReadonly}
        isRecipientOptionsLoading={page.isRecipientOptionsLoading}
        isSubmitting={page.isSubmitting}
        mode={page.mode}
        onBack={page.onBack}
        onFieldChange={page.handleFieldChange}
        onRecipientSearchChange={page.handleRecipientSearchChange}
        onRecipientToggle={page.handleRecipientToggle}
        onSubmit={page.handleSubmit}
        recipientOptions={page.recipientOptions}
        recipientSearch={page.recipientSearch}
        selectedRecipients={page.selectedRecipients}
        status={page.status}
      />
    </div>
  )
}
