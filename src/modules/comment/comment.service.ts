import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type DeleteResult, type InsertResult, Repository, type UpdateResult } from 'typeorm'
import { CommentTable } from './commnet.entity'

@Injectable()
export class CommentService {
  constructor (
    @InjectRepository(CommentTable)
    private readonly commentRepository: Repository<CommentTable>
  ) {
  }

  getCommentByUserIdAndCommentId (commentId: number, userId: number) {
    console.log(commentId, userId)
    return this.commentRepository.findBy({
      userId,
      id: commentId
    })
  }

  // 新增一条comment
  insert (momentId: number, content: string, userId: number, commentId?: number): Promise<InsertResult> {
    return this.commentRepository.insert({
      content,
      momentId,
      userId,
      commentId
    })
  }

  // 修改comment内容
  changeCommentById (momentId: number, content: string, userId: number): Promise<UpdateResult> {
    return this.commentRepository.update(
      momentId, {
        content,
        userId
      })
  }

  // 删除comment
  deleteCommentById (momentId: number): Promise<DeleteResult> {
    return this.commentRepository.delete(
      momentId)
  }
}
