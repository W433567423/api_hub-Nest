import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserTable } from './user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UserTable])],
  providers: [UserService],
  controllers: [UserController],
  exports: [TypeOrmModule, UserService]
})
export class UserModule {
}
