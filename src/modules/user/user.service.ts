import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserTable } from './user.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserTable)
    private readonly userRepository: Repository<UserTable>
  ) {
  }

  // findByName(username: string): Promise<UserTable[]> {
  //     console.log(username)
  //     return this.userRepository.findBy({username})
  // }
}
