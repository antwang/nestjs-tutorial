<!--
 * @Author: ant
 * @Date: 2023-06-21 11:49:36
 * @LastEditTime: 2023-06-21 18:09:48
 * @LastEditors: ant
 * @Description: 
-->

## Description
本节教程整体比较简单，主要包含两块内容，一是如何实现定时任务，另一个是在nestjs中如何使用配置文件。

### 定时任务
定时任务的实现，我们仍然是采用模块化的思路，定义一个tasks模块，然后在`app.module.ts`中引入并注册就行了。

定时任务的实现这里使用了`@nestjs/schedule`模块，我们用到了`Cron`、 `Interval`、`Timeout`三种实现方式。

### 配置文件
`nestjs` 的配置文件的使用方式也是模块化的，本身就内置了`@nestjs/config`模块实现配置文件的读取。我们只需要安装后，在需要用到的模块中将它引入注册就好。在本教程中，方便起见，直接在`app.module.ts`中以全局注册的方式引入了。

应用的时候，我们可以通过`ConfigService`提供的`get`方法读取对应的配置项。教程中把配置文件的读取放到了一个定时任务中去做了，可以在`tasks.service.ts` 中看到。

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
