import {
  Controller,
  Get,
  HttpCode,
  HttpException,
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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import * as fs from 'fs'
import * as path from 'path'
import { createPicName, uploadFile } from '../../utils'
import { UserService } from '../user/user.service'
import { MomentService } from '../moment/moment.service'
import { NoAuth } from '../../common/decorators'
import { type IFileObj } from './type'
import { type UserTable } from '../user/user.entity'

@Controller('file')
@ApiTags('文件系统')
export class FileController {
  constructor (private readonly FileService: FileService,
    private readonly UserService: UserService,
    private readonly MomentService: MomentService) {
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
    const filePath = path.resolve('src/../.uploads', String(req.user.id) + String(avatar.fieldname))
    fs.writeFileSync(filePath, avatar.buffer)
    const { Location } = await uploadFile({
      Key: `hub/avatar/${req.user.id}-avatar.png`,
      FilePath: filePath
    }) as any
    fs.rmSync(filePath)
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

  @Post('/publishImages/:momentId')
  @ApiOperation({
    summary: '用户给说说上传配图'
  })
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: 200,
    description: '成功返回200，失败返回400'
  })
  async savaMomentPictures (@Req() req: IUserReq, @UploadedFiles() files: Express.Multer.File[], @Param('momentId', ParseIntPipe) momentId: number) {
    const fileArr: IFileObj[] = []
    for (const item of files) {
      const filePath = path.resolve('src/../.uploads', String(req.user.id) + createPicName('pic-', '.png'))
      console.error(filePath)
      fs.writeFileSync(filePath, item.buffer)
      const { Location } = await uploadFile({
        Key: `hub/avatar/${req.user.id}-avatar.png`,
        FilePath: filePath
      }) as any
      fs.rmSync(filePath)
      const fileObj: IFileObj = {
        location: Location,
        mimeType: item.mimetype,
        size: String(item.size) + 'bit'
      }
      fileArr.push(fileObj)
    }
    const momentTables = await this.MomentService.getMomentByUserIdAndMomentId(req.user.id, momentId)

    if (!momentTables.length) {
      throw new HttpException('moment不存在或无权限', HttpStatus.UNAUTHORIZED)
    }

    const userTable = await this.UserService.findByName(req.user.username) as UserTable
    console.log(await this.FileService.saveMomentPics(userTable, momentTables[0], fileArr))
    return '头像上传成功'
  }
}
