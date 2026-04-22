'use strict'

const demoUserId = '1e7b72d5-1b50-4cc5-a325-cb8f8a1d8b60'

const recipients = [
  ['c3b0351e-8229-47d8-851f-e4562f0f4011', 'Maya Chen', 'maya.chen@example.com'],
  ['4e2b1531-2486-4892-a458-d4a7b838d932', 'Jonah Price', 'jonah.price@example.com'],
  ['0d7573ef-fef8-4821-bd1d-90bda5c53eb1', 'Elena Torres', 'elena.torres@example.com'],
  ['3096814b-dc54-4671-bdf4-60fbb2d0b7f5', 'Marcus Reed', 'marcus.reed@example.com'],
  ['dbc7bce5-a0cb-4ea7-8b1c-a598d7c20a74', 'Priya Singh', 'priya.singh@example.com'],
  ['423ca502-c55c-4d8b-b3bc-5f463f61f8e1', 'Noah Bennett', 'noah.bennett@example.com'],
  ['d35a09ec-e8fb-4423-81b1-5e6da3c77f1e', 'Sofia Alvarez', 'sofia.alvarez@example.com'],
  ['7e246b95-bf0b-4e03-bb8f-48ebf0f0d6e5', 'Liam Carter', 'liam.carter@example.com'],
  ['4cf4d927-c4c8-4e14-a985-41f255c5067b', 'Ava Morgan', 'ava.morgan@example.com'],
  ['797d49dc-2265-43f8-bf6e-42da56fe983b', 'Theo Brooks', 'theo.brooks@example.com']
]

const campaigns = {
  draft: '9c2f28eb-6cc0-4b05-8c75-4ea04cdb7bc4',
  scheduled: '25d77611-0a3d-4d1f-9b5c-40f09c329f5c',
  sent: 'd6b3622a-502c-4ce9-a7d8-27a4f5c9d356'
}

const seededPasswordHash = '$2b$10$AicMH86X0GfKlrwGcaVDVe1Jp/fhUDanM26NeLPU9/4SwbKfYRmIe'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date()
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('campaign_recipients', null, { transaction })
      await queryInterface.bulkDelete('campaigns', null, { transaction })
      await queryInterface.bulkDelete('recipients', null, { transaction })
      await queryInterface.bulkDelete('users', null, { transaction })

      await queryInterface.bulkInsert(
        'users',
        [
          {
            created_at: now,
            email: 'demo@example.com',
            id: demoUserId,
            name: 'Demo User',
            password: seededPasswordHash
          }
        ],
        { transaction }
      )

      await queryInterface.bulkInsert(
        'recipients',
        recipients.map(([id, name, email]) => ({
          created_at: now,
          email,
          id,
          name
        })),
        { transaction }
      )

      await queryInterface.bulkInsert(
        'campaigns',
        [
          {
            body: 'Early copy for upcoming release notes and tailored CTA blocks.',
            created_at: now,
            created_by: demoUserId,
            id: campaigns.draft,
            name: 'Launch prep draft',
            scheduled_at: null,
            status: 'draft',
            subject: 'Refine launch story before final send',
            updated_at: now
          },
          {
            body: 'Reminder campaign scheduled for tomorrow morning audience window.',
            created_at: now,
            created_by: demoUserId,
            id: campaigns.scheduled,
            name: 'Tomorrow reminder',
            scheduled_at: tomorrow,
            status: 'scheduled',
            subject: 'Reminder: registration closes tomorrow',
            updated_at: now
          },
          {
            body: 'Already delivered campaign with mixed results and real recipient activity.',
            created_at: yesterday,
            created_by: demoUserId,
            id: campaigns.sent,
            name: 'Spring recap',
            scheduled_at: null,
            status: 'sent',
            subject: 'See what shipped this spring',
            updated_at: now
          }
        ],
        { transaction }
      )

      await queryInterface.bulkInsert(
        'campaign_recipients',
        [
          {
            campaign_id: campaigns.draft,
            opened_at: null,
            recipient_id: recipients[0][0],
            sent_at: null,
            status: 'pending'
          },
          {
            campaign_id: campaigns.draft,
            opened_at: null,
            recipient_id: recipients[1][0],
            sent_at: null,
            status: 'pending'
          },
          {
            campaign_id: campaigns.scheduled,
            opened_at: null,
            recipient_id: recipients[2][0],
            sent_at: null,
            status: 'pending'
          },
          {
            campaign_id: campaigns.scheduled,
            opened_at: null,
            recipient_id: recipients[3][0],
            sent_at: null,
            status: 'pending'
          },
          {
            campaign_id: campaigns.scheduled,
            opened_at: null,
            recipient_id: recipients[4][0],
            sent_at: null,
            status: 'pending'
          },
          {
            campaign_id: campaigns.sent,
            opened_at: yesterday,
            recipient_id: recipients[5][0],
            sent_at: yesterday,
            status: 'sent'
          },
          {
            campaign_id: campaigns.sent,
            opened_at: null,
            recipient_id: recipients[6][0],
            sent_at: yesterday,
            status: 'sent'
          },
          {
            campaign_id: campaigns.sent,
            opened_at: yesterday,
            recipient_id: recipients[7][0],
            sent_at: yesterday,
            status: 'sent'
          },
          {
            campaign_id: campaigns.sent,
            opened_at: null,
            recipient_id: recipients[8][0],
            sent_at: null,
            status: 'failed'
          },
          {
            campaign_id: campaigns.sent,
            opened_at: null,
            recipient_id: recipients[9][0],
            sent_at: yesterday,
            status: 'sent'
          }
        ],
        { transaction }
      )
    })
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete('campaign_recipients', null, { transaction })
      await queryInterface.bulkDelete('campaigns', { id: Object.values(campaigns) }, { transaction })
      await queryInterface.bulkDelete(
        'recipients',
        { id: recipients.map(([id]) => id) },
        { transaction }
      )
      await queryInterface.bulkDelete('users', { id: demoUserId }, { transaction })
    })
  }
}
