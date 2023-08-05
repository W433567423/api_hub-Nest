import { Injectable, type NestMiddleware } from '@nestjs/common'
import { type NextFunction, type Request, type Response } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // 鉴权中间件
  use (req: Request, res: Response, next: NextFunction) {
    // const Authorization: string | undefined = req.headers.authorization?.replaceAll(' ', '')
    // if (!Authorization) {
    //   return
    // }
    // try {
    //   // console.log(Authorization)
    //   req.user = verify(Authorization, PUBLIC_KEY, { algorithms: ['RS256'] })
    //   next()
    // } catch {
    //   console.log('<-token解密失败')
    // }
    next()
  }
}
