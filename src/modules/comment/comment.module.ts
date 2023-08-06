import { Module } from '@nestjs/common'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommentTable } from './commnet.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CommentTable])],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [TypeOrmModule]
})
export class CommentModule {
}
