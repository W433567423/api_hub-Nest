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
  Patch,
  Post,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { MomentService } from './moment.service'
import { addTagsReqBodyMomentDto, listReqParmaMomentDto, publishReqBodyMomentDto } from './moment.dto'
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
  async publishMoment (@Body() reqData: publishReqBodyMomentDto, @Req() req: IUserReq) {
    await this.MomentService.insert(req.user.id, reqData.content)
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
  async getMomentList (@Query() reqData: listReqParmaMomentDto) {
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

  @Patch('/changeMomentDetail/:momentId')
  @ApiOperation({
    summary: '修改说说内容'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async changeMomentDetail (@Param('momentId', ParseIntPipe) momentId: number, @Body() reqData: publishReqBodyMomentDto, @Req() req: IUserReq) {
    const momentRes = await this.MomentService.getMomentByUserIdAndMomentId(momentId, req.user.id)
    if (!momentRes.length) {
      throw new HttpException('moment不存在或无权限', HttpStatus.UNAUTHORIZED)
    }
    await this.MomentService.changeMomentById(momentId, reqData.content)
    return '修改成功'
  }

  @Post('/:momentId/addLabels')
  @ApiOperation({
    summary: '给moment打上一系列标签'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async addLabelsToMoment (@Param('momentId', ParseIntPipe) momentId: number, @Body() reqData: addTagsReqBodyMomentDto, @Req() req: IUserReq) {
    await this.MomentService.linkMomentLabel(reqData.tags, momentId)
    console.log(await this.MomentService.isLinkMomentLabel(2, 2))
    return '新增标签成功'
  }
}
