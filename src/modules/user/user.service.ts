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

  // 通过username寻找
  findByName (username: string): Promise<UserTable[]> {
    return this.userRepository.findBy({ username })
  }

  // 增加一个用户
  create (username: string, password: string): Promise<UserTable> {
    return this.userRepository.save({
      username,
      password
    })
  }
}
