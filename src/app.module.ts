import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './modules/user/user.controller'
import { UserService } from './modules/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { MySQLConfig } from '../sercret'

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLConfig),
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {
}
