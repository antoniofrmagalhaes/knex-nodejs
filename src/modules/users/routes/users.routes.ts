import express from 'express'

import UsersController from '../controllers/UsersController'
import isAuthenticated from '../../../middlewares/isAuthenticated'

const usersRoute = express.Router()

usersRoute.get('/users', isAuthenticated, UsersController.getUser)
usersRoute.post('/users', UsersController.createUser)

export default usersRoute
