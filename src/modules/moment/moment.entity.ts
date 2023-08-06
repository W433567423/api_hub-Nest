import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserTable } from '../user/user.entity'
import { AppTable } from '../../app.entity'
import { CommentTable } from '../comment/commnet.entity'

@Entity('moment')
export class MomentTable extends AppTable {
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
  //
  // @Column({
  //   type: 'int',
  //   name: 'user_id'
  // })
  //   userId: number

  @ManyToOne(() => UserTable, (user) => user.moments)
  @JoinColumn({ name: 'user_id' })
    userId: number

  @OneToMany(() => CommentTable, (commont) => commont.momentId)
    comments: CommentTable[]
}
