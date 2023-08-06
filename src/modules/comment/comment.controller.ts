import { Body, Controller, HttpCode, HttpStatus, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common'
import { CommentService } from './comment.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { publishReqBodyCommentDto } from './comment.dto'
import { IUserReq } from '../user/user.dto'

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
  async publishMoment (@Body() reqBody: publishReqBodyCommentDto, @Req() req: IUserReq) {
    // await this.MomentService.insert(req.user.id, reqBody.content)
    await this.CommentService.insert(reqBody.momentId, reqBody.content, req.user.id)
    return '发布成功'
  }
}