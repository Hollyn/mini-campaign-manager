'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";', {
        transaction
      })

      await queryInterface.createTable(
        'users',
        {
          id: {
            allowNull: false,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
            primaryKey: true,
            type: Sequelize.UUID
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          created_at: {
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            type: Sequelize.DATE
          }
        },
        { transaction }
      )

      await queryInterface.createTable(
        'campaigns',
        {
          id: {
            allowNull: false,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
            primaryKey: true,
            type: Sequelize.UUID
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          subject: {
            allowNull: false,
            type: Sequelize.STRING(500)
          },
          body: {
            allowNull: false,
            type: Sequelize.TEXT
          },
          status: {
            allowNull: false,
            defaultValue: 'draft',
            type: Sequelize.STRING(20)
          },
          scheduled_at: {
            allowNull: true,
            type: Sequelize.DATE
          },
          created_by: {
            allowNull: false,
            references: {
              key: 'id',
              model: 'users'
            },
            onDelete: 'CASCADE',
            type: Sequelize.UUID
          },
          created_at: {
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            type: Sequelize.DATE
          },
          updated_at: {
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            type: Sequelize.DATE
          }
        },
        { transaction }
      )

      await queryInterface.createTable(
        'recipients',
        {
          id: {
            allowNull: false,
            defaultValue: Sequelize.literal('gen_random_uuid()'),
            primaryKey: true,
            type: Sequelize.UUID
          },
          email: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          name: {
            allowNull: false,
            type: Sequelize.STRING(255)
          },
          created_at: {
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            type: Sequelize.DATE
          }
        },
        { transaction }
      )

      await queryInterface.createTable(
        'campaign_recipients',
        {
          campaign_id: {
            allowNull: false,
            primaryKey: true,
            references: {
              key: 'id',
              model: 'campaigns'
            },
            onDelete: 'CASCADE',
            type: Sequelize.UUID
          },
          recipient_id: {
            allowNull: false,
            primaryKey: true,
            references: {
              key: 'id',
              model: 'recipients'
            },
            onDelete: 'CASCADE',
            type: Sequelize.UUID
          },
          sent_at: {
            allowNull: true,
            type: Sequelize.DATE
          },
          opened_at: {
            allowNull: true,
            type: Sequelize.DATE
          },
          status: {
            allowNull: false,
            defaultValue: 'pending',
            type: Sequelize.STRING(20)
          }
        },
        { transaction }
      )

      await queryInterface.sequelize.query(
        `ALTER TABLE campaigns
         ADD CONSTRAINT campaigns_status_check
         CHECK (status IN ('draft', 'sending', 'scheduled', 'sent'));`,
        { transaction }
      )

      await queryInterface.sequelize.query(
        `ALTER TABLE campaign_recipients
         ADD CONSTRAINT campaign_recipients_status_check
         CHECK (status IN ('pending', 'sent', 'failed'));`,
        { transaction }
      )
    })
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable('campaign_recipients', { transaction })
      await queryInterface.dropTable('recipients', { transaction })
      await queryInterface.dropTable('campaigns', { transaction })
      await queryInterface.dropTable('users', { transaction })
    })
  }
}
