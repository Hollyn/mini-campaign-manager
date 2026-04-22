'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.addIndex('users', ['email'], {
        name: 'idx_users_email',
        unique: true,
        transaction
      })

      await queryInterface.addIndex('campaigns', ['created_by'], {
        name: 'idx_campaigns_created_by',
        transaction
      })

      await queryInterface.addIndex('campaigns', ['status'], {
        name: 'idx_campaigns_status',
        transaction
      })

      await queryInterface.addIndex('campaigns', ['scheduled_at'], {
        name: 'idx_campaigns_scheduled_at',
        transaction,
        where: {
          status: 'scheduled'
        }
      })

      await queryInterface.addIndex('campaign_recipients', ['campaign_id'], {
        name: 'idx_cr_campaign_id',
        transaction
      })

      await queryInterface.addIndex('recipients', ['email'], {
        name: 'idx_recipients_email',
        unique: true,
        transaction
      })
    })
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.removeIndex('recipients', 'idx_recipients_email', { transaction })
      await queryInterface.removeIndex('campaign_recipients', 'idx_cr_campaign_id', { transaction })
      await queryInterface.removeIndex('campaigns', 'idx_campaigns_scheduled_at', { transaction })
      await queryInterface.removeIndex('campaigns', 'idx_campaigns_status', { transaction })
      await queryInterface.removeIndex('campaigns', 'idx_campaigns_created_by', { transaction })
      await queryInterface.removeIndex('users', 'idx_users_email', { transaction })
    })
  }
}
