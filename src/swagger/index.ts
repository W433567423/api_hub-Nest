import { DocumentBuilder } from '@nestjs/swagger'

export const swaggerOptions = new DocumentBuilder()
  .setTitle('Hub API')
  .setDescription('A swagger for hub API')
  .setVersion('1.0')
  .build()
