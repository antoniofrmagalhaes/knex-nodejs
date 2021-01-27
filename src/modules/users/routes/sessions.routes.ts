import express from 'express'

import SessionsController from '../controllers/SessionsController'

const sessionsRoute = express.Router()

sessionsRoute.post('/sessions', SessionsController.createSession)

export default sessionsRoute
