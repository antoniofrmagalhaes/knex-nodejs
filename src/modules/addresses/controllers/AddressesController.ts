import { Request, Response } from 'express'

import knex from '../../../database/connection'

import AppError from '../../../core/errors/AppError'

class AddressesController {
  async createAddress(request: Request, response: Response) {
    const { id: user_id } = request.user
    const { street, number, district, city, uf } = request.body
    try {
      knex.transaction(async trx => {
        const [id] = await knex('addresses')
          .transacting(trx)
          .insert({ street, number, district, city, uf })
        await knex('users_addresses').transacting(trx).insert({
          user_id,
          address_id: id,
        })
        return response.json({
          id,
          street,
          number,
          district,
          city,
          uf,
        })
      })
    } catch (error) {
      throw new AppError(error.message, 400)
    }
  }
}

export default new AddressesController()
