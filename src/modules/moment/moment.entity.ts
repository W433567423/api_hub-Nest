import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { UserTable } from '../user/user.entity'
import { AppTable } from '../../app.entity'

@Entity('moment')
export class MomentTable {
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

  @Column(() => AppTable)
    AppTable: AppTable

  @OneToMany(() => UserTable, (user) => user.id)
    moments: MomentTable[]
}
