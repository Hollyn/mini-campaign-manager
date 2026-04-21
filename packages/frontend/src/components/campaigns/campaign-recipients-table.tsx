import { CampaignRecipientActivity } from '../../api/types'
import { CAMPAIGN_COPY } from '../../constants/campaigns'
import { formatCampaignDateTime } from '../../lib/campaign-format'
import { Card } from '../ui/card'
import { CampaignRecipientStatusBadge } from './campaign-recipient-status-badge'

interface CampaignRecipientsTableProps {
  recipients: CampaignRecipientActivity[]
}

export const CampaignRecipientsTable = ({ recipients }: CampaignRecipientsTableProps) => (
  <Card className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-surface-container-lowest/95">
    <div className="border-b border-surface-container-low px-6 py-5">
      <h2 className="text-xl font-medium tracking-tight text-on-background">{CAMPAIGN_COPY.detail.recipientsLabel}</h2>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-surface-container-low text-[0.72rem] uppercase tracking-[0.24em] text-on-surface-variant">
          <tr>
            <th className="px-6 py-4">{CAMPAIGN_COPY.headers.recipientName}</th>
            <th className="px-6 py-4">{CAMPAIGN_COPY.headers.recipientEmail}</th>
            <th className="px-6 py-4">{CAMPAIGN_COPY.headers.recipientStatus}</th>
            <th className="px-6 py-4">{CAMPAIGN_COPY.headers.recipientSentAt}</th>
            <th className="px-6 py-4">{CAMPAIGN_COPY.headers.recipientOpenedAt}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-container-low">
          {recipients.map((recipient) => (
            <tr className="transition-colors hover:bg-surface-container-low/65" key={recipient.recipientId}>
              <td className="px-6 py-5 font-medium text-on-background">{recipient.name}</td>
              <td className="px-6 py-5 text-on-surface-variant">{recipient.email}</td>
              <td className="px-6 py-5">
                <CampaignRecipientStatusBadge status={recipient.status} />
              </td>
              <td className="px-6 py-5 text-on-surface-variant">{formatCampaignDateTime(recipient.sentAt)}</td>
              <td className="px-6 py-5 text-on-surface-variant">{formatCampaignDateTime(recipient.openedAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Card>
)
