import { Request, Response } from 'express'

import knex from '../../../database/connection'

import AppError from '../../../core/errors/AppError'
import Bcrypt from '../providers/hash/bcrypt/BCrypt'

class UsersController {
  async getUser(request: Request, response: Response) {
    const { id } = request.user
    const { name, email, created_at, updated_at } = await knex('users')
      .where('id', id)
      .first()
    const addresses = await knex('addresses').join(
      'users_addresses',
      'address_id',
      'users_addresses.user_id'
    )
    return response.json({ name, email, addresses, created_at, updated_at })
  }

  async createUser(request: Request, response: Response) {
    const { generateHash } = new Bcrypt()
    const { password, ...rest } = request.body
    try {
      const user = await knex('users').insert({
        password: await generateHash(password),
        ...rest,
      })
      return response.json(user)
    } catch (error) {
      console.log(error)
      throw new AppError(error.code, 400)
    }
  }
}

export default new UsersController()
