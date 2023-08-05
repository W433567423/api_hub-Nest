import { Injectable, type NestMiddleware } from '@nestjs/common'
import { type NextFunction, type Request, type Response } from 'express'
import * as console from 'console'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    console.log('Request...', req)
    next()
  }
}
