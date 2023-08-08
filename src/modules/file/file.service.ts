import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AvatarTable } from './file.entity'

@Injectable()
export class FileService {
  constructor (
    @InjectRepository(AvatarTable)
    private readonly AvatarRepository: Repository<AvatarTable>
  ) {
  }
}
