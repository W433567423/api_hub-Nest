import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { resDto } from '../../app.dto'

export class UserReqDto {
  @ApiProperty({
    type: String,
    example: 'tutu',
    description: '用户名'
  })
  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString()
  readonly username: string

  @ApiProperty({
    type: String,
    example: '123456',
    description: '密码',
    minimum: 6
  })
  @IsNotEmpty({ message: '密码不能为空' })
    password: string
}

export class UserResDto extends resDto {
  @ApiProperty({
    description: 'token令牌',
    type: String
  })
  readonly token: string

  @ApiProperty({
    description: '用户名',
    type: String
  })
  readonly username: string

  @ApiProperty({
    description: '用户id',
    type: String
  })
  readonly id: number
}

export class IUserReq extends Request {
  user: { id: number, username: string }
}
