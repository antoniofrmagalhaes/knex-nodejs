import express from 'express'
import jwt from 'jsonwebtoken'

import knex from '../../../database/connection'

import BCryptPasswordHashProvider from '../providers/hash/bcrypt/BCrypt'

const sessionsRoute = express.Router()

sessionsRoute.post('/sessions', async (request, response) => {
  const { compareHash } = new BCryptPasswordHashProvider()
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

  return response.json({ message: 'email/password incorrect' })
})

export default sessionsRoute
