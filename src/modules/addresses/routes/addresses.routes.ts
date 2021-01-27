import express from 'express'

import AddressesController from '../controllers/AddressesController'
import isAuthenticated from '../../../middlewares/isAuthenticated'

const addressesRoute = express.Router()

addressesRoute.post(
  '/addresses',
  isAuthenticated,
  AddressesController.createAddress
)

export default addressesRoute
