import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserController } from './modules/user/user.controller'
import { UserService } from './modules/user/user.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { MySQLConfig } from '../sercret'
import { AuthController } from './modules/auth/auth.controller'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard } from './common/guard/auth.guard'
import { MomentController } from './modules/moment/moment.controller'
import { MomentService } from './modules/moment/moment.service'
import { MomentModule } from './modules/moment/moment.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLConfig),
    UserModule,
    MomentModule
  ],
  controllers: [AppController, UserController, AuthController, MomentController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }, UserService, MomentService]
})
// export class AppModule implements NestModule {
//   configure (consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({ path: '/login', method: RequestMethod.POST })
//   }
// }
export class AppModule {
}
