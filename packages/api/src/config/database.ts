import { Sequelize } from 'sequelize-typescript'

import { env } from './env'
import { sequelizeModels } from '../models'

export const sequelize = new Sequelize(env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  models: sequelizeModels
})
