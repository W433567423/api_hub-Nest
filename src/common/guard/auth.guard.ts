import { type CanActivate, type ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { verify } from 'jsonwebtoken'
import { PUBLIC_KEY } from '../../../sercret'

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly urlList: string[] = [
    '/user/registry'
  ]

  async canActivate (
    context: ExecutionContext
  ): Promise<boolean> {
    console.log('进入鉴权')
    const request = context.switchToHttp().getRequest()
    const token: string | undefined = context.switchToRpc().getData().headers.token?.replaceAll(' ', '')
    if (this.urlList.includes(request.url)) {
      return true
    }
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
      throw new HttpException('没有授权访问,请先登录', HttpStatus.UNAUTHORIZED)
    }
  };
}
