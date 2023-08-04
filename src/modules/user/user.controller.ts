import { Controller, Post } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor (private readonly UserService: UserService) {
  }

  @Post('/registry')
  async registry () {
    return await this.UserService.findAll()
  }
}
