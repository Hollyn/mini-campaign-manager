import { Recipient } from '../../api/types'
import { RECIPIENT_COPY } from '../../constants/recipients'
import { Button } from '../ui/button'
import { Card } from '../ui/card'

interface PaginationSummary {
  limit: number
  page: number
  total: number
  totalPages: number
}

interface RecipientTableProps {
  isRefetching: boolean
  onDelete: (recipient: Recipient) => void
  onEdit: (recipient: Recipient) => void
  onNextPage: () => void
  onPreviousPage: () => void
  pagination: PaginationSummary | null
  recipients: Recipient[]
}

const getRecipientInitials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')

export const RecipientTable = ({
  isRefetching,
  onDelete,
  onEdit,
  onNextPage,
  onPreviousPage,
  pagination,
  recipients
}: RecipientTableProps) => {
  const start = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0
  const end = pagination ? Math.min(start + recipients.length - 1, pagination.total) : 0

  return (
    <Card className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-surface-container-low text-[0.72rem] uppercase tracking-[0.24em] text-on-surface-variant">
            <tr>
              <th className="px-6 py-4">{RECIPIENT_COPY.headers.name}</th>
              <th className="px-6 py-4">{RECIPIENT_COPY.headers.email}</th>
              <th className="px-6 py-4 text-right">{RECIPIENT_COPY.headers.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {recipients.map((recipient) => (
              <tr className="transition-colors hover:bg-surface-container-low/65" key={recipient.id}>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-container text-xs font-medium uppercase tracking-[0.18em] text-on-primary-container">
                      {getRecipientInitials(recipient.name)}
                    </div>
                    <div>
                      <p className="font-medium text-on-background">{recipient.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.22em] text-on-surface-variant">{RECIPIENT_COPY.row.eyebrow}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5 text-on-surface-variant">{recipient.email}</td>
                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <Button onClick={() => onEdit(recipient)} type="button" variant="tertiary">
                      {RECIPIENT_COPY.actions.edit}
                    </Button>
                    <Button onClick={() => onDelete(recipient)} type="button" variant="destructive">
                      {RECIPIENT_COPY.actions.delete}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-surface-container-low px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-on-surface-variant">{RECIPIENT_COPY.helper.pagination(start, end, pagination?.total ?? 0)}</p>
          {isRefetching ? <p className="mt-1 text-xs uppercase tracking-[0.22em] text-primary">{RECIPIENT_COPY.helper.refreshing}</p> : null}
        </div>
        <div className="flex gap-3">
          <Button
            disabled={!pagination || pagination.page <= 1}
            onClick={onPreviousPage}
            type="button"
            variant="secondary"
          >
            {RECIPIENT_COPY.actions.previousPage}
          </Button>
          <Button
            disabled={!pagination || pagination.page >= pagination.totalPages}
            onClick={onNextPage}
            type="button"
          >
            {RECIPIENT_COPY.actions.nextPage}
          </Button>
        </div>
      </div>
    </Card>
  )
}
