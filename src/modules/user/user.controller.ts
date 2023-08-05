import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service'
import { UserDto } from './user.dto'
import { md5Password } from '../../utils'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { sign, verify } from 'jsonwebtoken'
import { PRIVATE_KEY, PUBLIC_KEY } from '../../../sercret'

@Controller()
@ApiTags('user')
export class UserController {
  constructor (private readonly UserService: UserService) {
  }

  @Post('/login')
  @ApiOperation({ summary: '登录注册', description: '注册新登录' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回401',
    type: UserDto
  })
  async login (@Body() userReq: UserDto) {
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
    console.log('尝试解密\n')
    console.log(verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }))
    return {
      msg: 'success',
      data: {
        ...user,
        token
      }
    }
  }

  @Post('/registry')
  @ApiOperation({ summary: '用户注册', description: '注册新用户' })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400',
    type: UserDto
  })
  async registry (@Body() user: UserDto) {
    const {
      username,
      password: originPassword
    } = user
    const password = md5Password(originPassword)
    const isExist = (await this.UserService.findByName(username)).length
    if (isExist !== 0) {
      throw new HttpException('用户名已被注册', HttpStatus.CONFLICT)
    }
    await this.UserService.create(username, password)
    return {
      msg: 'success',
      data: {
        username
      }
    }
  }
}
