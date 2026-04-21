const path = require('node:path')
const dotenv = require('dotenv')

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const defaultUrl = 'postgresql://campaign:campaign@localhost:5432/campaign_manager'

process.env.DATABASE_URL ||= defaultUrl
process.env.TEST_DATABASE_URL ||= process.env.DATABASE_URL

const baseConfig = {
  dialect: 'postgres',
  logging: false,
  use_env_variable: 'DATABASE_URL'
}

module.exports = {
  development: baseConfig,
  test: {
    ...baseConfig,
    use_env_variable: 'TEST_DATABASE_URL'
  },
  production: baseConfig
}
