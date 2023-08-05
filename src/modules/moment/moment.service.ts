import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { MomentTable } from './moment.entity'

@Injectable()
export class MomentService {
  constructor (
    @InjectRepository(MomentTable)
    private readonly momentRepository: Repository<MomentTable>
  ) {
  }

  // 新增一条moment
  create (userId: number, content: string): Promise<MomentTable> {
    return this.momentRepository.save({
      userId,
      content
    })
  }
}
