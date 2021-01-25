/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { Server } from 'http'

import routes from './routes'
import AppError from './errors/AppError'

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

  private globalErrorHandler(): void {
    this.app.use(
      (e: Error, request: Request, response: Response, _: NextFunction) => {
        if (e instanceof AppError) {
          return response.status(e.statusCode).json({
            message: e.message,
          })
        }
        return response.status(500).json({
          message: e.message,
        })
      }
    )
  }

  private routes(): void {
    this.app.use(routes)
  }
}

export default new App().server
