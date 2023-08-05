import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { IUserReq, resDto, UserReqDto, UserResDto } from '../user/user.dto'
import { md5Password } from '../../utils'
import { sign, verify } from 'jsonwebtoken'
import { PRIVATE_KEY, PUBLIC_KEY } from '../../../sercret'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from '../user/user.service'
import { AuthGuard } from '../../common/guard/auth.guard'

@Controller()
@ApiTags('鉴权系统')
export class AuthController {
  constructor (private readonly UserService: UserService) {
  }

  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回403',
    type: UserResDto
  })
  async login (@Body() userReq: UserReqDto) {
    const {
      username,
      password: originPassword
    } = userReq
    const password = md5Password(originPassword)
    const ResUser = (await this.UserService.findByPassword(username, password))
    if (ResUser.length === 0) {
      throw new HttpException('密码不正确', HttpStatus.FORBIDDEN)
    }
    const user = { id: ResUser[0].id, username: ResUser[0].username }
    // 非对称加密生成token
    const token = sign(user, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: 'RS256'
    })// RS256非对称加密(min:2048)、HS256对拆加密(固定密钥)加密
    console.log('尝试解密')
    console.log(verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }))
    return {
      msg: 'success',
      data: {
        ...user,
        token
      }
    }
  }

  @Post('/test')
  @ApiTags('鉴权系统')
  @ApiOperation({ summary: '鉴权测试' })
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回401',
    type: resDto
  })

  async test (@Req() req: IUserReq) {
    console.log(req.user)
    return {
      msg: 'success',
      data: 'ok'
    }
  }
}
