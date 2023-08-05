import { Entity, UpdateDateColumn } from 'typeorm'

@Entity()
export class AppTable {
  @UpdateDateColumn({
    name: 'createAt',
    type: 'timestamp'
  })
    createAt!: Date

  @UpdateDateColumn({
    name: 'updateAt',
    type: 'timestamp'
  })
    updateAte!: Date
}
