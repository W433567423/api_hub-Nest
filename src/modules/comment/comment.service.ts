import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type InsertResult, Repository } from 'typeorm'
import { CommentTable } from './commnet.entity'

@Injectable()
export class CommentService {
  constructor (
    @InjectRepository(CommentTable)
    private readonly commentRepository: Repository<CommentTable>
  ) {
  }

  insert (momentId: number, content: string, userId: number, commentId?: number): Promise<InsertResult> {
    return this.commentRepository.insert({
      content,
      momentId,
      userId,
      commentId
    })
  }
}
