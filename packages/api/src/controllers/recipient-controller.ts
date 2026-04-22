import { NextFunction, Request, Response } from 'express'

import {
  createRecipient,
  deleteRecipient,
  listRecipients,
  updateRecipient
} from '../services/recipient-service'
import {
  createRecipientRequestSchema,
  recipientListQuerySchema,
  recipientListResponseSchema,
  recipientParamsSchema,
  recipientResponseSchema,
  Recipient,
  updateRecipientRequestSchema
} from '../validations/recipient'

const toRecipientDto = (recipient: {
  createdAt: Date
  email: string
  id: string
  name: string
}): Recipient => ({
  createdAt: recipient.createdAt.toISOString(),
  email: recipient.email,
  id: recipient.id,
  name: recipient.name
})

export const getRecipients = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const query = recipientListQuerySchema.parse(request.query)
    const result = await listRecipients(query)

    response.status(200).json(
      recipientListResponseSchema.parse({
        pagination: result.pagination,
        recipients: result.recipients.map(toRecipientDto)
      })
    )
  } catch (error) {
    next(error)
  }
}

export const postRecipient = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const payload = createRecipientRequestSchema.parse(request.body)
    const recipient = await createRecipient(payload)

    response.status(201).json(
      recipientResponseSchema.parse({
        recipient: toRecipientDto(recipient)
      })
    )
  } catch (error) {
    next(error)
  }
}

export const patchRecipient = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = recipientParamsSchema.parse(request.params)
    const payload = updateRecipientRequestSchema.parse(request.body)
    const recipient = await updateRecipient(params.id, payload)

    response.status(200).json(
      recipientResponseSchema.parse({
        recipient: toRecipientDto(recipient)
      })
    )
  } catch (error) {
    next(error)
  }
}

export const removeRecipient = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const params = recipientParamsSchema.parse(request.params)

    await deleteRecipient(params.id)

    response.status(204).send()
  } catch (error) {
    next(error)
  }
}
