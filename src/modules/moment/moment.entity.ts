import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserTable } from '../user/user.entity'
import { AppTable } from '../../app.entity'
import { CommentTable } from '../comment/commnet.entity'
import { LabelTable } from '../label/label.entity'
import { PictureTable } from '../file/picture.entity'

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

  @ManyToMany(() => LabelTable, label => label.moments)
  @JoinTable()
    labels: LabelTable[]

  @OneToMany(() => PictureTable, (pic) => pic.moment)
    pictures: PictureTable[]
}
