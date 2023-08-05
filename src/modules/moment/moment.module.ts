import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MomentTable } from './moment.entity'
import { MomentController } from './moment.controller'
import { MomentService } from './moment.service'

@Module({
  imports: [TypeOrmModule.forFeature([MomentTable])],
  providers: [MomentService],
  controllers: [MomentController],
  exports: [TypeOrmModule]
})
export class MomentModule {
}
