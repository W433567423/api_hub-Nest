import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LabelTable } from './label.entity'

@Injectable()
export class LabelService {
  constructor (
    @InjectRepository(LabelTable)
    private readonly labelRepository: Repository<LabelTable>
  ) {
  }

  getLabelList (): Promise<LabelTable[]> {
    return this.labelRepository
      .createQueryBuilder('label')
      .select([
        'label.id',
        'label.title',
        'label.createAt',
        'label.updateAt'
      ])
      .addSelect('COUNT(moments.id)', 'momentCount')
      .leftJoin('label.moments', 'moments')
      .groupBy('label.id')
      .getRawMany()
  }
}
