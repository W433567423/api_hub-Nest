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
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { CommentService } from './comment.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { changeReqBodyCommentDto, publishReqBodyCommentDto, replyReqBodyCommentDto } from './comment.dto'
import { IUserReq } from '../user/user.dto'
import { NoAuth } from '../../common/decorators'

@Controller('comment')
@ApiTags('评论系统')
export class CommentController {
  constructor (private readonly CommentService: CommentService) {
  }

  @Post('/publish')
  @ApiOperation({
    summary: '用户给说说发表评论'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async publishComment (@Body() reqBody: publishReqBodyCommentDto, @Req() req: IUserReq) {
    await this.CommentService.insert(reqBody.momentId, reqBody.content, req.user.id)
    return '发布成功'
  }

  @Post('/reply')
  @ApiOperation({
    summary: '用户给说说的评论回复评论'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async replyComment (@Body() reqBody: replyReqBodyCommentDto, @Req() req: IUserReq) {
    await this.CommentService.insert(reqBody.momentId, reqBody.content, req.user.id, reqBody.commentId)
    return '发布成功'
  }

  @Patch('/changeComment/:commentId')
  @ApiOperation({
    summary: '用户修改说说的评论'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async changeComment (@Body() reqBody: changeReqBodyCommentDto, @Req() req: IUserReq, @Param('commentId', ParseIntPipe) commentId: number) {
    const commentRes = await this.CommentService.getCommentByUserIdAndCommentId(commentId, req.user.id)
    if (!commentRes.length) {
      throw new HttpException('moment不存在或无权限', HttpStatus.UNAUTHORIZED)
    }
    await this.CommentService.changeCommentById(commentId, reqBody.content, req.user.id)
    return '修改成功'
  }

  @Delete('/deleteComment/:commentId')
  @ApiOperation({
    summary: '用户删除说说的评论'
  })
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async deleteComment (@Req() req: IUserReq, @Param('commentId', ParseIntPipe) commentId: number) {
    const commentRes = await this.CommentService.getCommentByUserIdAndCommentId(commentId, req.user.id)
    if (!commentRes.length) {
      throw new HttpException('moment不存在或无权限', HttpStatus.UNAUTHORIZED)
    }
    await this.CommentService.deleteCommentById(commentId)
    return '删除成功'
  }

  @Get('/getCommentList/:momentId')
  @ApiOperation({
    summary: '获取moment的说说的列表'
  })
  @NoAuth()
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async getCommentList (@Param('momentId', ParseIntPipe) momentId: number) {
    return await this.CommentService.getCommentList(momentId)
  }
}
