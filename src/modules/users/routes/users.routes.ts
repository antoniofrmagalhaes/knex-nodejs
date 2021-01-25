import express from 'express'

import knex from '../../../database/connection'
import isAuthenticated from '../../../middlewares/isAuthenticated'

import BCryptPasswordHashProvider from '../providers/password/bcrypt/BCryptPasswordHashProvider'

const usersRoute = express.Router()

usersRoute.get('/users', isAuthenticated, async (_, response) => {
  const users = await knex('users').select('*')
  return response.json(users)
})

usersRoute.post('/users', async (request, response) => {
  const { generateHash } = new BCryptPasswordHashProvider()
  const { password, ...rest } = request.body
  try {
    const user = await knex('users').insert({
      password: await generateHash(password),
      ...rest,
    })
    return response.json(user)
  } catch (error) {
    return response.send(`${error.message}. add logger`)
  }
})

export default usersRoute
