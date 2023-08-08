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
import { CommentModule } from './modules/comment/comment.module'
import { LabelModule } from './modules/label/label.module'
import { FileController } from './modules/file/file.controller'
import { FileModule } from './modules/file/file.module'
import { FileService } from './modules/file/file.service'

@Module({
  imports: [
    TypeOrmModule.forRoot(MySQLConfig),
    UserModule,
    MomentModule,
    CommentModule,
    LabelModule,
    FileModule
  ],
  controllers: [AppController, UserController, AuthController, MomentController, FileController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }, UserService, MomentService, FileService]
})
// 中间件
// export class AppModule implements NestModule {
//   configure (consumer: MiddlewareConsumer) {
//     consumer
//       .apply(AuthMiddleware)
//       .forRoutes({ path: '/login', method: RequestMethod.POST })
//   }
// }
export class AppModule {
}
