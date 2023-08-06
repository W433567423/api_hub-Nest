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

  // 查询moment列表
  getMomentList (page: number, size: number): Promise<MomentTable[]> {
    return this.momentRepository.find({
      skip: page,
      take: size
    })
  }

  // 查询moment详情
  getMomentDetail (momentId: number): Promise<MomentTable[]> {
    return this.momentRepository.findBy({ id: momentId })
  }
}
