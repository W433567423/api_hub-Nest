import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { MomentTable } from '../moment/moment.entity'
import { UserTable } from '../user/user.entity'

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

  @ManyToOne(() => MomentTable, (moment) => moment.comments)
  @JoinColumn({ name: 'moment_id' })
    moment: MomentTable

  @ManyToOne(() => UserTable, (user) => user.comments)
  @JoinColumn({ name: 'user_id' })
    user: UserTable
}
