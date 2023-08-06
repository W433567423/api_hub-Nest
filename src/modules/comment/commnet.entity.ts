import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { MomentTable } from '../moment/moment.entity'

@Entity('comment')
export class CommentTable extends AppTable {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
    id: number

  @Column({
    type: 'varchar',
    name: 'content'
  })
    content: string

  @Column({
    type: 'int',
    name: 'moment_id'
  })
    momentId: number

  @Column({
    type: 'int',
    name: 'user_id'
  })
    userId: number

  @OneToMany(() => MomentTable, (moment) => moment.id)
    moments: CommentTable[]
}
