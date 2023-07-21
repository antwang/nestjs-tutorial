## 概述
在`nestjs`项目中实现文件上传功能很简单，`nestjs`提供了内置的模块来处理文件上传，该模块是基于`express`的中间件[multer](https://github.com/expressjs/multer)实现的。

教程中分别演示了以下几种文件上传场景的实现：
- 基本的单文件上传
- 基本的文件类型校验
- 多文件上传（多个表单字段下单个或多个文件）
- 单表单字段下多个文件的上传
- 文件保存到服务器

## 实现说明
首先我们`UseInterceptors`把`FileInterceptor`（上传多个文件使用`FileFieldsInterceptor`）拦截器与路由处理函数绑定在一起，然后使用`UploadedFile`（上传多个文件使用`UploadedFiles`）从请求中提取上传的文件。如果需要对文件类型、大小等进行校验，我们可以使用`ParseFilePipeBuilder`添加需要的文件校验器，例如本教程中使用了`addFileTypeValidator`来校验文件类型。

默认情况下，服务端接收到的文件保存在内存，如果你想把文件保存到本地服务器或者云端的文件服务器，可以在fileInterceptor装饰器函数中进行配置，例如：
```ts
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
```
示例代码中，我们指定了文件存储到本地的uploads目录，同时保存后的文件名使用了当前时间加9位随机数的组合。

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
