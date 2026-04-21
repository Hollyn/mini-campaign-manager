import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

import { campaignStatuses, CampaignStatus } from '../validations/shared'
import { CampaignRecipient } from './campaign-recipient'
import { Recipient } from './recipient'
import { User } from './user'

@Table({
  tableName: 'campaigns',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})
export class Campaign extends Model<InferAttributes<Campaign>, InferCreationAttributes<Campaign>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>

  @Column({
    allowNull: false,
    type: DataType.STRING(255)
  })
  declare name: string

  @Column({
    allowNull: false,
    type: DataType.STRING(500)
  })
  declare subject: string

  @Column({
    allowNull: false,
    type: DataType.TEXT
  })
  declare body: string

  @Default('draft')
  @Column({
    allowNull: false,
    type: DataType.STRING(20),
    validate: {
      isIn: [campaignStatuses]
    }
  })
  declare status: CreationOptional<CampaignStatus>

  @Column({
    allowNull: true,
    field: 'scheduled_at',
    type: DataType.DATE
  })
  declare scheduledAt: Date | null

  @ForeignKey(() => User)
  @Column({
    allowNull: false,
    field: 'created_by',
    type: DataType.UUID
  })
  declare createdBy: string

  @Column({
    allowNull: false,
    field: 'created_at',
    type: DataType.DATE
  })
  declare createdAt: CreationOptional<Date>

  @Column({
    allowNull: false,
    field: 'updated_at',
    type: DataType.DATE
  })
  declare updatedAt: CreationOptional<Date>

  @BelongsTo(() => User, 'createdBy')
  declare creator?: NonAttribute<User>

  @HasMany(() => CampaignRecipient, 'campaignId')
  declare campaignRecipients?: NonAttribute<CampaignRecipient[]>

  @BelongsToMany(() => Recipient, () => CampaignRecipient, 'campaignId', 'recipientId')
  declare recipients?: NonAttribute<Recipient[]>
}
