import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserTable } from '../user/user.entity'
import { AppTable } from '../../app.entity'
import { CommentTable } from '../comment/commnet.entity'
import { LabelTable } from '../label/label.entity'

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

  @Column({
    type: 'int',
    name: 'user_id'
  })
    userId: number

  @ManyToOne(() => UserTable)
  @JoinColumn({ name: 'user_id' })
    user: UserTable

  @OneToMany(() => CommentTable, (comment) => comment.moment)
    comments: CommentTable[]

  // @ManyToMany(() => LabelTable)
  // @JoinTable({ name: 'labelId' })
  //   labels: LabelTable[]

  @ManyToMany(() => LabelTable)
    moments: LabelTable[]
}
