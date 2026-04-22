import { Campaign } from './campaign'
import { CampaignRecipient } from './campaign-recipient'
import { Recipient } from './recipient'
import { User } from './user'

export { Campaign, CampaignRecipient, Recipient, User }

export const sequelizeModels = [User, Campaign, Recipient, CampaignRecipient]
