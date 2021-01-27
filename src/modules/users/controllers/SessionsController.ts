import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import knex from '../../../database/connection'

import AppError from '../../../core/errors/AppError'
import Bcrypt from '../providers/hash/bcrypt/BCrypt'

class SessionsController {
  async createSession(request: Request, response: Response) {
    const { compareHash } = new Bcrypt()
    const { email, password } = request.body

    const {
      id,
      name,
      password: passwordHash,
      created_at,
      updated_at,
    } = await knex('users').where('email', email).first()

    if (await compareHash(password, passwordHash)) {
      return response.json({
        user: { name, email, created_at, updated_at },
        token: jwt.sign({}, 'some-secret', {
          subject: id.toString(),
          expiresIn: '1d',
        }),
      })
    }

    throw new AppError('email/password incorrect', 401)
  }
}

export default new SessionsController()
