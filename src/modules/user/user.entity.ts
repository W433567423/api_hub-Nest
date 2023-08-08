import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { MomentTable } from '../moment/moment.entity'
import { CommentTable } from '../comment/commnet.entity'
import { AvatarTable } from '../file/file.entity'

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

  @OneToOne(() => AvatarTable)
  @JoinColumn({ name: 'avatar_id' })
    avatar: AvatarTable

  @ManyToOne(() => MomentTable, moment => moment.user)
    moments: MomentTable[]

  @ManyToOne(() => CommentTable, comment => comment.moment)
    comments: CommentTable[]
}
