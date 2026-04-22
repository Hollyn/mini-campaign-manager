import {
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  CreationOptional
} from 'sequelize'
import {
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

import {
  campaignRecipientStatuses,
  CampaignRecipientStatus
} from '../validations/shared'
import { Campaign } from './campaign'
import { Recipient } from './recipient'

@Table({
  tableName: 'campaign_recipients',
  timestamps: false
})
export class CampaignRecipient extends Model<
  InferAttributes<CampaignRecipient>,
  InferCreationAttributes<CampaignRecipient>
> {
  @PrimaryKey
  @ForeignKey(() => Campaign)
  @Column({
    allowNull: false,
    field: 'campaign_id',
    type: DataType.UUID
  })
  declare campaignId: string

  @PrimaryKey
  @ForeignKey(() => Recipient)
  @Column({
    allowNull: false,
    field: 'recipient_id',
    type: DataType.UUID
  })
  declare recipientId: string

  @Column({
    allowNull: true,
    field: 'sent_at',
    type: DataType.DATE
  })
  declare sentAt: Date | null

  @Column({
    allowNull: true,
    field: 'opened_at',
    type: DataType.DATE
  })
  declare openedAt: Date | null

  @Default('pending')
  @Column({
    allowNull: false,
    type: DataType.STRING(20),
    validate: {
      isIn: [campaignRecipientStatuses]
    }
  })
  declare status: CreationOptional<CampaignRecipientStatus>

  @BelongsTo(() => Campaign, 'campaignId')
  declare campaign?: NonAttribute<Campaign>

  @BelongsTo(() => Recipient, 'recipientId')
  declare recipient?: NonAttribute<Recipient>
}
