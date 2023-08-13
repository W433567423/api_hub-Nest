import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AvatarTable, PictureTable } from './file.entity'
import { FileController } from './file.controller'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([AvatarTable, PictureTable]), UserModule],
  providers: [FileService],
  controllers: [FileController],
  exports: [TypeOrmModule]
})
export class FileModule {

}