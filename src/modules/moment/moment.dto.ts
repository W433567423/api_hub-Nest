import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsString } from 'class-validator'

// 用于发布的req Body类型
export class publishReqBodyMomentDto {
  @ApiProperty({
    type: String,
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
    type: String,
    example: 0,
    description: '页码'
  })
  @IsNotEmpty({ message: '页码不能为空' })
  @IsString()
  readonly page: string

  @ApiProperty({
    type: String,
    example: 5,
    description: '每页数量'
  })
  @IsNotEmpty({ message: '每页数量不能为空' })
  @IsString()
  readonly size: string
}

export class addTagsReqBodyMomentDto {
  @ApiProperty({
    type: [String],
    example: ['日常', '社交', '心情'],
    description: '标签列表'
  })
  @IsNotEmpty({ message: '标签列表不能为空' })
  @IsArray()
  @IsString({ each: true })
  readonly tags: string[]
}
