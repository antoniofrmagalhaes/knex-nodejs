import { Request, Response, Router } from 'express'

import usersRoute from '../../modules/users/routes/users.routes'
import addressesRoute from '../../modules/addresses/routes/addresses.routes'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'REST API v0.0.1' })
})

routes.use(usersRoute)
routes.use(addressesRoute)

export default routes
