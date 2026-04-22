import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import {
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

import { Campaign } from './campaign'
import { CampaignRecipient } from './campaign-recipient'

@Table({
  tableName: 'recipients',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
export class Recipient extends Model<InferAttributes<Recipient>, InferCreationAttributes<Recipient>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
    unique: 'idx_recipients_email'
  })
  declare email: string

  @Column({
    allowNull: false,
    type: DataType.STRING(255)
  })
  declare name: string

  @Default(DataType.NOW)
  @Column({
    allowNull: false,
    field: 'created_at',
    type: DataType.DATE
  })
  declare createdAt: CreationOptional<Date>

  @HasMany(() => CampaignRecipient, 'recipientId')
  declare campaignRecipients?: NonAttribute<CampaignRecipient[]>

  @BelongsToMany(() => Campaign, () => CampaignRecipient, 'recipientId', 'campaignId')
  declare campaigns?: NonAttribute<Campaign[]>
}
