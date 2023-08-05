import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './modules/user/user.controller'
import { UserService } from './modules/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { MySQLConfig } from '../sercret'
import { AuthMiddleware } from './common/auth.middleware'
import { AuthController } from './modules/auth/auth.controller'

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLConfig),
    UserModule
  ],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '/login', method: RequestMethod.POST })
  }
}
