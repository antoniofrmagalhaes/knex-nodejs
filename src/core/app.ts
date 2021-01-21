/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express'
import 'express-async-errors'
import cors from 'cors'
import { Server } from 'http'

import routes from './routes'
import GlobalErrorHandler from './errors/GlobalErrorHandler'

class App {
  public app: express.Application
  public server: Server
  constructor() {
    this.app = express()
    this.server = new Server(this.app)
    this.middlewares()
    this.routes()
    this.globalErrorHandler()
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.json())
  }

  private routes(): void {
    this.app.use(routes)
  }

  private globalErrorHandler(): void {
    this.app.use(GlobalErrorHandler)
  }
}

export default new App().server
