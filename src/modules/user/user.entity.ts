import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'

@Entity('user')
export class UserTable {
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

  @Column(() => AppTable)
    AppTable: AppTable
}
