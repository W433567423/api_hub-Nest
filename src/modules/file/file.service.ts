import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AvatarTable } from './avatar.entity'
import { type PictureTable } from './picture.entity'

@Injectable()
export class FileService {
  constructor (
    @InjectRepository(AvatarTable)
    private readonly AvatarRepository: Repository<AvatarTable>,
    @InjectRepository(AvatarTable)
    private readonly PictureRepository: Repository<PictureTable>
  ) {
  }

  saveAvatar (fileUrl: string, mimeType: string, size: string) {
    const avatar = new AvatarTable()
    avatar.size = size
    avatar.mimetype = mimeType
    avatar.avatarUrl = fileUrl
    return this.AvatarRepository.save(avatar)
  }

  getUserAvatar (userId: number) {
    return this.AvatarRepository
      .createQueryBuilder('avatar')
      .select(['avatar.avatarUrl'])
      .leftJoin('avatar.user', 'user')
      .where('user.id = :userId', { userId })
      .getOne()
  }
}
