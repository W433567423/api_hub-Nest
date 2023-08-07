import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MomentTable } from './moment.entity'
import { MomentController } from './moment.controller'
import { MomentService } from './moment.service'
import { LabelService } from '../label/label.service'
import { LabelModule } from '../label/label.module'

@Module({
  imports: [TypeOrmModule.forFeature([MomentTable]), LabelModule],
  providers: [MomentService, LabelService],
  controllers: [MomentController],
  exports: [TypeOrmModule]
})
export class MomentModule {
}
