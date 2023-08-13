import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerOptions } from './swagger'
import { ResponseInterceptor } from './common/interceptor/res.interceptor'
import 'module-alias/register.js'
import { SERVER_PORT } from './config'
// import moduleAlias from 'module-alias'
// import path from 'path'
//
// moduleAlias.addAlias('@src', path.join(__dirname, '/src'))

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    // logger: ['warn', 'error']  打印日志的类别
  })
  // swagger注入
  SwaggerModule.setup('api', app, SwaggerModule.createDocument(app, swaggerOptions))

  // 注册全局通用响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(SERVER_PORT)
  console.log(`服务已开启,端口为${SERVER_PORT}`)
}

void bootstrap().then()
