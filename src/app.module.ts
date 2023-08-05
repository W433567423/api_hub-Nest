import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './modules/user/user.controller'
import { UserService } from './modules/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'bj-cynosdbmysql-grp-jrtc8xqu.sql.tencentcdb.com',
      port: 23423,
      username: 'root',
      password: 'Tutu7331*',
      database: 'hub-Nest',
      autoLoadEntities: true,
      // 数据库同步更新
      synchronize: true
    }),
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {
}
