import { Request, Response, Router } from 'express'

const routes = Router()

routes.get('/', (_: Request, response: Response) => {
  return response.json({ message: 'REST API v0.0.1' })
})

export default routes
