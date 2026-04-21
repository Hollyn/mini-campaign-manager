import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute
} from 'sequelize'
import {
  Column,
  DataType,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table
} from 'sequelize-typescript'

import { Campaign } from './campaign'

@Table({
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: CreationOptional<string>

  @Column({
    allowNull: false,
    type: DataType.STRING(255),
    unique: 'idx_users_email'
  })
  declare email: string

  @Column({
    allowNull: false,
    type: DataType.STRING(255)
  })
  declare name: string

  @Column({
    allowNull: false,
    type: DataType.STRING(255)
  })
  declare password: string

  @Column({
    allowNull: false,
    field: 'created_at',
    type: DataType.DATE
  })
  declare createdAt: CreationOptional<Date>

  @HasMany(() => Campaign, 'createdBy')
  declare campaigns?: NonAttribute<Campaign[]>
}
