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

  // label是否已经存在
  // isExistLabel (title: string): Promise<LabelTable | null> {
  //   return this.labelRepository.findOneBy({ title })
  // }
  //
  // insertLabel (title: string): Promise<InsertResult> {
  //   return this.labelRepository.insert({ title })
  // }
  //
  // isLinkLabelMoment (title: string, momentId: number): Promise<LabelTable[]> {
  //   return this.labelRepository.find({ relations: ['moments'] })
  // }
}
