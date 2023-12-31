import { Body, Controller, HttpCode, HttpException, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { UserService } from './user.service'
import { UserReqDto } from './user.dto'
import { md5Password } from '../../utils'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NoAuth } from '../../common/decorators'

// import { AuthInterceptor } from '../../common/interceptor/auth.interceptor'

@Controller('user')
@ApiTags('用户系统')
export class UserController {
  constructor (private readonly UserService: UserService) {
  }

  @Post('/registry')
  @ApiOperation({
    summary: '用户注册',
    description: '注册新用户'
  })
  @NoAuth()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400',
    type: UserReqDto
  })
  async registry (@Body() user: UserReqDto) {
    const {
      username,
      password: originPassword
    } = user
    const password = md5Password(originPassword)
    const isExist = await this.UserService.findByName(username)
    if (isExist) {
      throw new HttpException('用户名已被注册', HttpStatus.CONFLICT)
    }
    await this.UserService.create(username, password)
    return '注冊成功'
  }
}
