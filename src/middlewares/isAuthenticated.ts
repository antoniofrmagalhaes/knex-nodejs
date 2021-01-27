import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '../core/errors/AppError'

interface IPayload {
  iat: number
  exp: number
  sub: string
}

export default function isAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const { authorization } = request.headers
  if (!authorization) {
    throw new AppError('Token is missing', 401)
  }
  const [, token] = authorization.split(' ')
  try {
    const decoded = verify(token, 'some-secret')
    const { sub } = decoded as IPayload
    request.user = { id: sub }
    next()
  } catch {
    throw new AppError('Invalid token', 401)
  }
}
