import { Body, Controller, HttpCode, HttpStatus, Post, Query, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MomentService } from './moment.service'
import { listReqParmaDto, publishReqBodyDto } from './moment.dto'
import { IUserReq } from '../user/user.dto'
import { NoAuth } from '../../common/decorators'

@Controller('moment')
@ApiTags('心情系统')
export class MomentController {
  constructor (private readonly MomentService: MomentService) {
  }

  @Post('/publish')
  @ApiOperation({
    summary: '用户发布说说'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async publishMoment (@Body() reqData: publishReqBodyDto, @Req() req: IUserReq) {
    console.log(req.user)
    await this.MomentService.create(req.user.id, reqData.content)
    return '发布成功'
  }

  @Post('/getMomentList')
  @ApiOperation({
    summary: '用户发布说说'
  })
  @NoAuth()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async getMomentList (@Query() reqData: listReqParmaDto) {
    console.log(reqData.page)
    return await this.MomentService.getMomentList(Number(reqData.page), Number(reqData.size))
  }
}
