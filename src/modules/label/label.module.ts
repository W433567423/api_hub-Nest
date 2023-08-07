import { Module } from '@nestjs/common'
import { LabelService } from './label.service'
import { LabelController } from './label.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LabelTable } from './label.entity'

@Module({
  imports: [TypeOrmModule.forFeature([LabelTable])],
  providers: [LabelService],
  controllers: [LabelController],
  exports: [TypeOrmModule]
})
export class LabelModule {
}
