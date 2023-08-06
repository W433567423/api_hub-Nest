import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
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
    await this.MomentService.create(req.user.id, reqData.content)
    return '发布成功'
  }

  @Post('/getMomentList')
  @ApiOperation({
    summary: '获取说说列表'
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

  @Get('/getMomentDetail/:momentId')
  @ApiOperation({
    summary: '获取说说列表'
  })
  @NoAuth()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async getMomentDetail (@Param('momentId', ParseIntPipe) momentId: number) {
    return await this.MomentService.getMomentDetail(momentId)
  }

  @Delete('/deleteMoment/:momentId')
  @ApiOperation({
    summary: '删除说说'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async deleteMoment (@Param('momentId', ParseIntPipe) momentId: number, @Req() req: IUserReq) {
    const momentRes = await this.MomentService.getMomentByUserIdAndMomentId(momentId, req.user.id)
    if (!momentRes.length) {
      throw new HttpException('moment不存在或无权限', HttpStatus.UNAUTHORIZED)
    }
    await this.MomentService.deleteMomentById(momentId)
    return '删除成功'
  }
}
