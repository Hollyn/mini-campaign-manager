import { DeleteRecipientModal } from '../components/recipients/delete-recipient-modal'
import { RecipientEmptyState } from '../components/recipients/recipient-empty-state'
import { RecipientFormModal } from '../components/recipients/recipient-form-modal'
import { RecipientListSkeleton } from '../components/recipients/recipient-list-skeleton'
import { RecipientTable } from '../components/recipients/recipient-table'
import { Alert } from '../components/ui/alert'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { RECIPIENT_COPY } from '../constants/recipients'
import { useRecipientsPage } from '../hooks/use-recipients-page'

export const RecipientsPage = () => {
  const page = useRecipientsPage()

  if (page.isLoading) {
    return <RecipientListSkeleton />
  }

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden rounded-[2rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(211,228,254,0.95),rgba(250,248,255,0.94)_55%,rgba(242,243,255,0.96))] px-6 py-7 sm:px-8 sm:py-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-primary">{RECIPIENT_COPY.intro.badge}</p>
            <div className="space-y-3">
              <h1 className="text-4xl font-medium tracking-tight text-on-background sm:text-[3.4rem]">
                {RECIPIENT_COPY.intro.title}
              </h1>
              <p className="max-w-xl text-sm leading-7 text-on-surface-variant sm:text-base">
                {RECIPIENT_COPY.intro.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:items-end">
            <div className="rounded-[1.5rem] bg-white/70 px-5 py-4 shadow-[0_18px_50px_rgba(31,49,89,0.08)] backdrop-blur">
              <p className="text-[0.7rem] uppercase tracking-[0.28em] text-on-surface-variant">{RECIPIENT_COPY.intro.liveTotalLabel}</p>
              <p className="mt-2 text-3xl font-medium tracking-tight text-on-background">{page.totalRecipients}</p>
              <p className="mt-1 text-sm text-on-surface-variant">{RECIPIENT_COPY.helper.totalCount(page.totalRecipients)}</p>
            </div>
            <Button onClick={page.openCreateModal} type="button">
              {RECIPIENT_COPY.actions.add}
            </Button>
          </div>
        </div>
      </Card>

      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}

      {page.recipients.length === 0 && !page.pageErrorMessage ? (
        <RecipientEmptyState onAddRecipient={page.openCreateModal} />
      ) : page.recipients.length > 0 ? (
        <RecipientTable
          isRefetching={page.isRefetching}
          onDelete={page.openDeleteModal}
          onEdit={page.openEditModal}
          onNextPage={page.handleNextPage}
          onPreviousPage={page.handlePreviousPage}
          pagination={page.pagination}
          recipients={page.recipients}
        />
      ) : null}

      <RecipientFormModal
        errorMessage={page.formErrorMessage}
        isOpen={page.isFormOpen}
        isPending={page.isSubmitting}
        mode={page.formMode}
        onChange={page.handleFormChange}
        onClose={page.closeForm}
        onSubmit={page.handleFormSubmit}
        values={page.formValues}
      />

      <DeleteRecipientModal
        errorMessage={page.deleteErrorMessage}
        isOpen={page.isDeleteOpen}
        isPending={page.isDeleting}
        onClose={page.closeDeleteModal}
        onConfirm={page.handleDeleteConfirm}
        recipient={page.deleteCandidate}
      />
    </div>
  )
}
