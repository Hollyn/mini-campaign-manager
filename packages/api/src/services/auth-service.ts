import bcrypt from 'bcrypt'

import { User } from '../models'
import { AppError } from '../utils/app-error'
import { signSessionToken, verifySessionToken } from '../utils/jwt'
import { AUTH_MESSAGES, AUTH_NUMBERS } from '../constants/auth'
import { AuthUser, LoginRequest, RegisterRequest } from '../validations/auth'

interface AuthSession {
  token: string
  user: AuthUser
}

const toAuthUser = (user: User): AuthUser => ({
  email: user.email,
  id: user.id,
  name: user.name
})

const createAuthSession = (user: User): AuthSession => {
  const authUser = toAuthUser(user)

  return {
    token: signSessionToken({
      email: authUser.email,
      name: authUser.name,
      sub: authUser.id
    }),
    user: authUser
  }
}

export const getAuthUserBySessionToken = async (token: string) => {
  const payload = verifySessionToken(token)
  const user = await User.findByPk(payload.sub)

  if (!user) {
    throw new AppError(401, AUTH_MESSAGES.sessionInvalid)
  }

  return toAuthUser(user)
}

export const loginUser = async (input: LoginRequest) => {
  const user = await User.findOne({
    where: {
      email: input.email
    }
  })

  if (!user) {
    throw new AppError(401, AUTH_MESSAGES.invalidCredentials)
  }

  const isPasswordValid = await bcrypt.compare(input.password, user.password)

  if (!isPasswordValid) {
    throw new AppError(401, AUTH_MESSAGES.invalidCredentials)
  }

  return createAuthSession(user)
}

export const registerUser = async (input: RegisterRequest) => {
  const existingUser = await User.findOne({
    where: {
      email: input.email
    }
  })

  if (existingUser) {
    throw new AppError(409, AUTH_MESSAGES.emailInUse)
  }

  const hashedPassword = await bcrypt.hash(input.password, AUTH_NUMBERS.bcryptSaltRounds)
  const user = await User.create({
    createdAt: new Date(),
    email: input.email,
    name: input.name,
    password: hashedPassword
  })

  return createAuthSession(user)
}
