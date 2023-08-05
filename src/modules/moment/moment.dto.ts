import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class resDto {
  @ApiProperty({ description: 'success' })
  readonly msg: string
}

// 用于发布的req Body类型
export class publishReqDto {
  @ApiProperty({
    example: '今天天气真好',
    description: '说说内容'
  })
  @IsNotEmpty({ message: '说说内容不能为空' })
  @IsString()
  readonly content: string
}
