import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { LabelTable } from './label.entity'

@Injectable()
export class LabelService {
  constructor (
    @InjectRepository(LabelTable)
    private readonly momentRepository: Repository<LabelTable>
  ) {
  }
}
