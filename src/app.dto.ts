import { ApiProperty } from '@nestjs/swagger'

export class resDto {
  @ApiProperty({ description: 'code' })
  readonly code: number

  @ApiProperty({ description: 'path' })
  readonly path: string

  @ApiProperty({ description: 'msg' })
  readonly msg: string
}
