import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserTable } from './user.entity'
import { type AvatarTable } from '../file/avatar.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserTable)
    private readonly userRepository: Repository<UserTable>
    // @InjectRepository(AvatarTable)
    // private readonly avatarRepository: Repository<AvatarTable>
  ) {
  }

  // 通过username寻找
  findByName (username: string): Promise<UserTable | null> {
    return this.userRepository.findOneBy({ username })
  }

  // 增加一个用户
  create (username: string, password: string): Promise<UserTable> {
    return this.userRepository.save({
      username,
      password
    })
  }

  // 比对密码
  findByPassword (username: string, password: string): Promise<UserTable[]> {
    return this.userRepository.findBy({
      username,
      password
    })
  }

  // 保存头像
  async saveUserAvatar (avatarTable: AvatarTable, userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['avatar']
    }) as UserTable
    user.avatar = avatarTable
    return await this.userRepository.update(userId, user)
  }
}
