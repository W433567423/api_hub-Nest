import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseInterceptors
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { FileService } from './file.service'
import { IUserReq } from '../user/user.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'
import * as path from 'path'
import { uploadFile } from '../../utils'
import { UserService } from '../user/user.service'
import { NoAuth } from '../../common/decorators'

@Controller('file')
@ApiTags('文件系统')
export class FileController {
  constructor (private readonly FileService: FileService,
    private readonly UserService: UserService) {
  }

  @Post('/avatar')
  @ApiOperation({
    summary: '用户上传头像'
  })
  @UseInterceptors(FileInterceptor('avatar'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async savaUserAvatar (@Req() req: IUserReq, @UploadedFile() avatar: Express.Multer.File) {
    try {
      await fs.promises.stat('src/../.uploads')
    } catch (e) {
      // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
      await fs.promises.mkdir('src/../.uploads', { recursive: true })
    }
    const filePath = path.resolve('src/../.uploads', String(req.user.id) + String(avatar.fieldname))
    fs.writeFileSync(filePath, avatar.buffer)
    // console.log(avatar.mimetype, avatar.size, 'avatar' + avatar.fieldname)
    const { Location } = await uploadFile({
      Key: `hub/avatar/${req.user.id}-avatar.png`,
      FilePath: filePath
    }) as any
    const avatarTable = await this.FileService.saveAvatar(Location, avatar.mimetype, String(avatar.size) + 'bit')

    await this.UserService.saveUserAvatar(avatarTable, req.user.id)
    return '头像上传成功'
  }

  @Get('/avatar/:userId')
  @ApiOperation({
    summary: '查看用户头像'
  })
  @NoAuth()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async getUserAvatar (@Param('userId', ParseIntPipe) userId: number) {
    return await this.FileService.getUserAvatar(userId)
  }

  @Post('/pictures')
  @ApiOperation({
    summary: '用户上传moment的配图'
  })
  @UseInterceptors(FileInterceptor('pics'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async savaMomentPics (@Req() req: IUserReq, @UploadedFiles() pics: Express.Multer.File) {
    // try {
    //   await fs.promises.stat('src/../.uploads')
    // } catch (e) {
    //   // 不存在文件夹，直接创建 {recursive: true} 这个配置项是配置自动创建多个文件夹
    //   await fs.promises.mkdir('src/../.uploads', { recursive: true })
    // }
    // const filePath = path.resolve('src/../.uploads', String(req.user.id) + String(avatar.fieldname))
    // fs.writeFileSync(filePath, avatar.buffer)
    // // console.log(avatar.mimetype, avatar.size, 'avatar' + avatar.fieldname)
    // const { Location } = await uploadFile({
    //   Key: `hub/avatar/${req.user.id}-avatar.png`,
    //   FilePath: filePath
    // }) as any
    // const avatarTable = await this.FileService.saveAvatar(Location, avatar.mimetype, String(avatar.size) + 'bit')
    //
    // await this.UserService.saveUserAvatar(avatarTable, req.user.id)
    // return '头像上传成功'
    return 'ok'
  }
}
