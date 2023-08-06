import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { MomentTable } from '../moment/moment.entity'
import { CommentTable } from '../comment/commnet.entity'

@Entity('user')
export class UserTable extends AppTable {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
    id: number

  @Column({
    type: 'varchar',
    name: 'username'
  })
    username: string

  @Column({
    type: 'varchar',
    name: 'password'
  })
    password: string

  @ManyToOne(() => MomentTable, moment => moment.userId)
    moments: MomentTable[]

  @ManyToOne(() => CommentTable, comment => comment.userId)
    comments: CommentTable[]
}
