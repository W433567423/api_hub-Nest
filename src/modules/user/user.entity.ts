import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class UserTable {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number

  @Column({
    type: 'varchar', name: 'username'
  })
    username: string

  @Column({ type: 'varchar', name: 'password' })
    password: string
}
