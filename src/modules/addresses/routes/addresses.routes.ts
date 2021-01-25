import express from 'express'
import knex from '../../../database/connection'

const addressesRoute = express.Router()

addressesRoute.get('/addresses', async (_, response) => {
  const addresses = await knex('addresses').select('*')
  return response.json(addresses)
})

addressesRoute.post('/addresses', async (request, response) => {
  const user = request.body
  try {
    await knex('addresses').insert(user)
  } catch (error) {
    return response.send(`${error.message}. add logger`)
  }
  return response.json(user)
})

export default addressesRoute
