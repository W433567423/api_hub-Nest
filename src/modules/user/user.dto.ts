import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

class resDto {
  @ApiProperty({ description: 'success' })
  readonly msg: string
}

export class UserReqDto {
  @ApiProperty({ example: 'tutu', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string

  @ApiProperty({ example: '123456', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
    password: string
}

export class UserResDto extends resDto {
  @ApiProperty({ description: 'token令牌' })
  readonly token: string

  @ApiProperty({ description: '用户名' })
  readonly username: string

  @ApiProperty({ description: '用户id' })
  readonly id: number
}
