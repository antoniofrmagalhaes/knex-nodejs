import express from 'express'
import knex from '../../../database/connection'

const usersRoute = express.Router()

usersRoute.get('/users', async (request, response) => {
  const users = await knex('users').select('*')
  return response.json(users)
})

usersRoute.post('/users', async (request, response) => {
  const user = request.body
  try {
    await knex('users').insert(user)
  } catch (error) {
    return response.send(`${error.message}. add logger`)
  }
  return response.json(user)
})

export default usersRoute
