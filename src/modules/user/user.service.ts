import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserTable } from './user.entity'
import { AvatarTable } from '../file/file.entity'

@Injectable()
export class UserService {
  constructor (
    @InjectRepository(UserTable)
    private readonly userRepository: Repository<UserTable>
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
    return this.userRepository.findBy({ username, password })
  }

  // 保存头像
  async saveAvatar (fileUrl: string, mimeType: string, size: string, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } }) as UserTable
    const avatar = new AvatarTable()
    avatar.size = size
    avatar.mimetype = mimeType
    avatar.avatarUrl = fileUrl
    user.avatar = avatar
    return await this.userRepository.save(user)
  }
}
