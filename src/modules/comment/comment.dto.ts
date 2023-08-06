import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

// 用于发布的req Body类型
export class publishReqBodyCommentDto {
  @ApiProperty({
    example: '今天天气真好',
    description: '说说内容'
  })
  @IsNotEmpty({ message: '说说内容不能为空' })
  @IsString()
  readonly content: string

  @ApiProperty({
    example: '1',
    description: '说说id'
  })
  @IsNotEmpty({ message: '说说id不能为空' })
  @IsNumber()
  readonly momentId: number
}

export class replyReqBodyCommentDto {
  @ApiProperty({
    example: '今天天气真好',
    description: '说说内容'
  })
  @IsNotEmpty({ message: '说说内容不能为空' })
  @IsString()
  readonly content: string

  @ApiProperty({
    example: '1',
    description: '说说id'
  })
  @IsNotEmpty({ message: '说说id不能为空' })
  @IsNumber()
  readonly momentId: number

  @ApiProperty({
    example: '1',
    description: '评论id'
  })
  @IsNotEmpty({ message: '评论id不能为空' })
  @IsNumber()
  readonly commentId: number
}
