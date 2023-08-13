import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { UserTable } from '../user/user.entity'

@Entity('avatar')
export class AvatarTable extends AppTable {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
    id: number

  @Column({
    type: 'varchar',
    name: 'avatar_url'
  })
    avatarUrl: string

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

  @OneToOne(() => UserTable, user => user.avatar)
    user: UserTable
}
