import { DeleteRecipientModal } from '../components/recipients/delete-recipient-modal'
import { RecipientEmptyState } from '../components/recipients/recipient-empty-state'
import { RecipientFormModal } from '../components/recipients/recipient-form-modal'
import { RecipientListSkeleton } from '../components/recipients/recipient-list-skeleton'
import { RecipientTable } from '../components/recipients/recipient-table'
import { Alert } from '../components/ui/alert'
import { useRecipientsPage } from '../hooks/use-recipients-page'

export const RecipientsPage = () => {
  const page = useRecipientsPage()

  if (page.isLoading) {
    return <RecipientListSkeleton />
  }

  return (
    <div className="space-y-6">
      {page.pageErrorMessage ? <Alert variant="destructive">{page.pageErrorMessage}</Alert> : null}

      {page.totalRecipients === 0 && page.search.length === 0 && !page.pageErrorMessage ? (
        <RecipientEmptyState onAddRecipient={page.openCreateModal} />
      ) : (
        <RecipientTable
          isRefetching={page.isRefetching}
          onAddRecipient={page.openCreateModal}
          onDelete={page.openDeleteModal}
          onEdit={page.openEditModal}
          onNextPage={page.handleNextPage}
          onPageChange={page.handlePageChange}
          onPageSizeChange={page.handlePageSizeChange}
          onPreviousPage={page.handlePreviousPage}
          onSearchChange={page.handleSearchChange}
          onSortChange={page.handleSortChange}
          pageSize={page.pageSize}
          pagination={page.pagination}
          recipients={page.recipients}
          search={page.search}
          sortBy={page.sortBy}
          sortDirection={page.sortDirection}
        />
      )}

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
