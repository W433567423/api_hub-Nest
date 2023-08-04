import { Body, Controller, Post } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { UserService } from './user.service'
import { UserDto } from './user.dto'

@Controller('user')
export class UserController {
  // constructor (private readonly UserService: UserService) {
  // }

  @Post('/registry')
  async registry (@Body() user: UserDto) {
    const { username } = user
    // console.log(await this.UserService.findByName(username))
    return username
  }
}
