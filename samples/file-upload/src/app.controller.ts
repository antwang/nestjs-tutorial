/*
 * @Author: ant
 * @Date: 2023-07-20 17:08:17
 * @LastEditTime: 2023-07-21 18:07:23
 * @LastEditors: ant
 * @Description: 
 */
import { Body, Controller, Get, ParseFilePipeBuilder, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './sample.dto';
import { diskStorage } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@Body() body: SampleDto, @UploadedFile() file: Express.Multer.File) {
    console.log({body, file: file.buffer.toString()});
    return {
      body,
      file: file.buffer.toString()
    }
  }
  @Post('upload/validation')
  @UseInterceptors(FileInterceptor('file'))
  uploadFileAndPValidate(
    @Body() body: SampleDto, 
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'json' })
        .build({fileIsRequired: false})) 
    file?: Express.Multer.File) {
      console.log({
        body,
        file: file?.buffer.toString()
      });
    return {
      body,
      file: file?.buffer.toString()
    }
  }

  @Post('upload/array-files')
  @UseInterceptors(FilesInterceptor('files', 2, {
    storage:diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const fileNameSplit = file.originalname.split('.');
        const extension = fileNameSplit[fileNameSplit.length - 1];
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}.${extension}`);
      }
    })
  }))
  uploadArrayFiles(@UploadedFiles() files: Express.Multer.File[]) {
    console.log(files);
    return {code: 0, msg: '上传成功', data: null}
  }

  @Post('upload/multiple')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]))
  uploadMultipleFiles(@UploadedFiles() files: { avatar: Express.Multer.File, cover: Express.Multer.File }) {
    return {code: 0, msg: '上传成功', data: null}
  }
}
