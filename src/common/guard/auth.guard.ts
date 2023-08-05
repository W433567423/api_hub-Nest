import { type CanActivate, type ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { PUBLIC_KEY } from '../../../sercret'
import { IS_PUBLIC_KEY } from '../decorators'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard implements CanActivate {
  // 跳过鉴权(也可用@Public)
  // private readonly urlList: string[] = [
  //   '/user/registry'
  // ]

  constructor (private readonly reflector: Reflector) {
  }

  async canActivate (
    context: ExecutionContext
  ): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ])
    console.log('\n\n\n')
    if (isPublic) {
      console.log('跳过鉴权')
      return true
    } else {
      console.log('进入鉴权')
      const request = context.switchToHttp().getRequest()
      const token: string | undefined = context.switchToRpc().getData().headers.token?.replaceAll(' ', '')
      // if (this.urlList.includes(request.url)) {
      //   return true
      // }
      if (token) {
        try {
          console.log('鉴权成功')
          request.user = verify(token, PUBLIC_KEY, { algorithms: ['RS256'] })
          return true
        } catch {
          console.log('鉴权失败', token)
          console.log(verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }))
          throw new HttpException('token验证失败', HttpStatus.UNAUTHORIZED)
        }
      } else {
        console.log('无token')
        throw new HttpException('没有授权访问,请先登录', HttpStatus.UNAUTHORIZED)
      }
    }
  }
}
