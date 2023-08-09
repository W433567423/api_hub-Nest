import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { type DeleteResult, type InsertResult, Repository, type UpdateResult } from 'typeorm'
import { MomentTable } from './moment.entity'
import { LabelTable } from '../label/label.entity'

@Injectable()
export class MomentService {
  constructor (
    @InjectRepository(MomentTable)
    private readonly momentRepository: Repository<MomentTable>,
    @InjectRepository(LabelTable)
    private readonly labelRepository: Repository<LabelTable>
  ) {
  }

  // 新增一条moment
  insert (userId: number, content: string): Promise<InsertResult> {
    return this.momentRepository.insert({
      userId,
      content
    })
  }

  // 查询moment列表
  getMomentList (page: number, size: number): Promise<MomentTable[]> {
    return this.momentRepository.createQueryBuilder('moment')
      .skip(size * page)
      .take(size)
      .select([
        'moment.id',
        'moment.content',
        'moment.createAt',
        'user.id',
        'user.username'])
      .addSelect(
        'COUNT(labels.id)', 'labelCount')
      .addSelect(
        'COUNT(comments.id)', 'commentCount')
      .leftJoin('moment.user', 'user')
      .leftJoin('moment.comments', 'comments')
      .leftJoin('moment.labels', 'labels')
      .groupBy('moment.id')
      .getRawMany()
  }

  // 查询moment详情
  getMomentDetail (momentId: number): Promise<MomentTable | null> {
    return this.momentRepository.createQueryBuilder('moment')
      .select([
        'moment.id',
        'moment.content',
        'moment.createAt',
        'user.id',
        'user.username',
        'comments.id',
        'comments.content',
        'comments.userId',
        'comments.commentId',
        'avatar.avatarUrl'])
      .leftJoin('moment.user', 'user')
      .leftJoin('moment.comments', 'comments')
      .leftJoin('moment.labels', 'labels')
      .leftJoin('user.avatar', 'avatar')
      .where('moment.id= :momentId', { momentId })
      .getOne()
  }

  // 查询moment通过userId和momentId
  getMomentByUserIdAndMomentId (momentId: number, userId: number): Promise<MomentTable[]> {
    return this.momentRepository.findBy({
      id: momentId,
      userId
    })
  }

  // 删除moment by id
  deleteMomentById (momentId: number): Promise<DeleteResult> {
    return this.momentRepository.delete(momentId)
  }

  // 修改moment by id
  changeMomentById (momentId: number, content: string): Promise<UpdateResult> {
    return this.momentRepository.update(momentId, { content })
  }

  async linkMomentLabel (labels: string[], momentId: number): Promise<MomentTable> {
    const labelList = []
    for (const label of labels) {
      const flag = await this.labelRepository.findOneBy({ title: label })
      if (flag) {
        labelList.push(flag)
      } else {
        await this.labelRepository.insert({ title: label })
        labelList.push(await this.labelRepository.findOneBy({ title: label }) as LabelTable)
      }
    }
    const oldLabels = await this.momentRepository.findOne({ where: { id: momentId }, relations: ['labels'] })
    const ids = oldLabels?.labels.map(item => item?.id)
    const labelListMap = labelList.filter(
      // eslint-disable-next-line array-callback-return
      (item) => {
        if (!ids?.includes(item.id)) return item
      }
    )
    const moment = new MomentTable()
    moment.labels = [...oldLabels?.labels ?? [], ...labelListMap]
    moment.id = momentId
    return await this.momentRepository.save(moment)
  }

  // isLinkMomentLabel (labelId: number, momentId: number): Promise<MomentTable | null> {
  //   return this.momentRepository.findOne({ where: { id: momentId }, relations: ['labels'] })
  //   // return this.momentRepository.createQueryBuilder('moment')
  //   //   .leftJoinAndSelect('momentRepository.labels', 'labelRepository.moments')
  //   //   .getMany()
  // }
}
