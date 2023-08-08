import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { NoAuth } from '../../common/decorators'
import { LabelService } from './label.service'

@Controller('label')
@ApiTags('标签系统')
export class LabelController {
  constructor (private readonly LabelService: LabelService) {
  }

  @Get('/labelList')
  @ApiOperation({
    summary: '获取标签列表'
  })
  @NoAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async getMomentDetail () {
    return await this.LabelService.getLabelList()
  }
}
