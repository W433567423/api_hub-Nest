import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

// 用于发布的req Body类型
export class publishReqBodyMomentDto {
  @ApiProperty({
    example: '今天天气真好',
    description: '说说内容'
  })
  @IsNotEmpty({ message: '说说内容不能为空' })
  @IsString()
  readonly content: string
}

// 用于发布的req Body类型
export class listReqParmaMomentDto {
  @ApiProperty({
    example: 0,
    description: '页码'
  })
  @IsNotEmpty({ message: '页码不能为空' })
  @IsString()
  readonly page: number

  @ApiProperty({
    example: 5,
    description: '每页数量'
  })
  @IsNotEmpty({ message: '每页数量不能为空' })
  @IsString()
  readonly size: string
}