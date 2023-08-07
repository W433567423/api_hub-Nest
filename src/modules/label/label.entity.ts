import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AppTable } from '../../app.entity'
import { MomentTable } from '../moment/moment.entity'

@Entity('label')
export class LabelTable extends AppTable {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id'
  })
    id: number

  @Column({
    type: 'varchar',
    name: 'title'
  })
    title: string

  @ManyToMany(() => MomentTable)
  @JoinTable()
    moments: MomentTable[]
}
