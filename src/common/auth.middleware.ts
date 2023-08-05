import { Injectable, type NestMiddleware } from '@nestjs/common'
import { type NextFunction, type Request, type Response } from 'express'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // 鉴权中间件
  use (req: Request, res: Response, next: NextFunction) {
    // // 获取用户名密码
    // const { username, password } = req.body
    //
    // // 判断用户名是否存在
    // let dbRes: any
    // try {
    //   dbRes = await userService.getUserByName(username)
    // } catch (e) {
    //   const error = new Error(errorType.SQL_ERROR)
    //   return ctx.app.emit('error', error, ctx)
    // }
    // if (!dbRes[0].length) {
    //   const error = new Error(errorType.USERNAME_NOT_EXISTS)
    //   return ctx.app.emit('error', error, ctx)
    // }
    //
    // // 判断密码和数据库中是否一致(加密)
    // if (md5Password(password) !== dbRes[0][0].password) {
    //   const error = new Error(errorType.PASSWORD_ERROR)
    //   return ctx.app.emit('error', error, ctx)
    // }
    // ctx.user = dbRes[0][0]
    next()
  }
}
