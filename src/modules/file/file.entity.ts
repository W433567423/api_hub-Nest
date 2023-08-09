import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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
  @JoinColumn({ name: 'user_id' })
    user: UserTable
}

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

  @OneToMany(() => UserTable, user => user.pictures)
  @JoinColumn({ name: 'picture_id' })
    user: UserTable
}
