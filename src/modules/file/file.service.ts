import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AvatarTable } from './avatar.entity'
import { PictureTable } from './picture.entity'
import { type MomentTable } from '../moment/moment.entity'
import { type IFileObj } from './type'
import { type UserTable } from '../user/user.entity'

@Injectable()
export class FileService {
  constructor (
    @InjectRepository(AvatarTable)
    private readonly AvatarRepository: Repository<AvatarTable>,
    @InjectRepository(PictureTable)
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

  async saveMomentPics (user: UserTable, moment: MomentTable, files: IFileObj[]) {
    const promiseArr: Array<Promise<PictureTable>> = []
    for (const file of files) {
      const picture = new PictureTable()
      picture.size = file.size
      picture.mimetype = file.mimeType
      picture.pictureUrl = file.location
      picture.moment = moment
      picture.user = user
      promiseArr.push(this.PictureRepository.save(picture))
    }
    return await Promise.all(promiseArr)
  }
}
