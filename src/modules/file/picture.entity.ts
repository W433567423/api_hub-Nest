import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { UserTable } from '../user/user.entity'
import { MomentTable } from '../moment/moment.entity'

@Entity('picture')
export class PictureTable extends AppTable {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
    id: number

  @Column({
    type: 'varchar',
    name: 'picture_url'
  })
    pictureUrl: string

  @Column({
    type: 'varchar',
    name: 'mimetype'
  })
    mimetype: string

  @Column({
    type: 'varchar',
    name: 'size'
  })
    size: string

  @ManyToOne(() => UserTable)
  @JoinColumn({ name: 'user_id' })
    user: UserTable

  @ManyToOne(() => MomentTable)
  @JoinColumn({ name: 'moment_id' })
    moment: MomentTable
}
