import { Op, UniqueConstraintError } from 'sequelize'

import { Recipient } from '../models'
import { RECIPIENT_MESSAGES } from '../constants/recipients'
import { AppError } from '../utils/app-error'
import {
  CreateRecipientRequest,
  RecipientListQuery,
  UpdateRecipientRequest
} from '../validations/recipient'

const toConflictError = (error: UniqueConstraintError) => {
  const details = error.errors
    .map((issue) => issue.message)
    .filter((message): message is string => Boolean(message))

  return new AppError(409, RECIPIENT_MESSAGES.duplicateEmail, details.length > 0 ? details : undefined)
}

const findRecipientOrThrow = async (id: string) => {
  const recipient = await Recipient.findByPk(id)

  if (!recipient) {
    throw new AppError(404, RECIPIENT_MESSAGES.notFound)
  }

  return recipient
}

export const listRecipients = async (query: RecipientListQuery) => {
  const offset = (query.page - 1) * query.limit
  const { count, rows } = await Recipient.findAndCountAll({
    limit: query.limit,
    offset,
    order: [['createdAt', 'DESC']],
    where:
      query.search.length > 0
        ? {
            [Op.or]: [
              {
                email: {
                  [Op.iLike]: `%${query.search}%`
                }
              },
              {
                name: {
                  [Op.iLike]: `%${query.search}%`
                }
              }
            ]
          }
        : undefined
  })

  return {
    pagination: {
      limit: query.limit,
      page: query.page,
      total: count,
      totalPages: count === 0 ? 0 : Math.ceil(count / query.limit)
    },
    recipients: rows
  }
}

export const createRecipient = async (input: CreateRecipientRequest) => {
  try {
    return await Recipient.create({
      createdAt: new Date(),
      email: input.email,
      name: input.name
    })
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw toConflictError(error)
    }

    throw error
  }
}

export const updateRecipient = async (id: string, input: UpdateRecipientRequest) => {
  const recipient = await findRecipientOrThrow(id)

  try {
    await recipient.update({
      email: input.email,
      name: input.name
    })

    return recipient
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw toConflictError(error)
    }

    throw error
  }
}

export const deleteRecipient = async (id: string) => {
  const recipient = await findRecipientOrThrow(id)

  await recipient.destroy()
}
