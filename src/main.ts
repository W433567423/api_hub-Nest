import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule } from '@nestjs/swagger'
import { swaggerOptions } from './swagger'
import { ResponseInterceptor } from './common/interceptor/res.interceptor'
import { SERVER_PORT } from './config'

async function bootstrap () {
  const app = await NestFactory.create(AppModule, {
    // logger: ['warn', 'error']  打印日志的类别
  })
  // swagger注入
  SwaggerModule.setup('', app, SwaggerModule.createDocument(app, swaggerOptions))

  // 注册全局通用响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor())

  await app.listen(SERVER_PORT)
  console.log(`服务已开启,端口为${SERVER_PORT}`)
}

void bootstrap().then()
