import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class UserDto {
  @ApiProperty({ example: 'tutu', description: '用户名' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string

  @ApiProperty({ example: '123456', description: '密码' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string
}
