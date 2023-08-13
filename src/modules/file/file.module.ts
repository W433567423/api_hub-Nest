import { Module } from '@nestjs/common'
import { FileService } from './file.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AvatarTable } from './avatar.entity'
import { FileController } from './file.controller'
import { UserModule } from '../user/user.module'
import { PictureTable } from './picture.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AvatarTable, PictureTable]), UserModule],
  providers: [FileService],
  controllers: [FileController],
  exports: [TypeOrmModule]
})
export class FileModule {

}
