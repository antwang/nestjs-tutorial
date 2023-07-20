## 概述
该项目示例了，在nestjs中如何实现任务队列。
## Bull
`Bull` 是一种流行的、支持良好的、基于 Node.js 的高性能队列系统实现。`Bull` 使用 `Redis` 来持久化任务数据，需要安装 `Redis`。 由于底层是 `Redis` 所以队列的架构可以做到完全的分布式和平台独立。 例如，可以让一些队列生产者、消费者和侦听器在一个（或多个）节点上的 `Nest` 中运行，而其他生产者、消费者和侦听器在其他网络节点上的其他 `Node.js` 平台上运行。
## @nestjs/bull
`Nest` 提供 `@nestjs/bull` 包作为 `Bull` 之上的抽象/包装器， 该包可以轻松地将 `Bull Queues` 以 `Nest` 友好的方式集成到应用程序中。

[nestjs 队列官网教程](https://docs.nestjs.com/techniques/queues) 

## 队列
队列是一种强大的设计模式，队列可以解决应用面临的规模和性能问题，例如:缓解服务器处理压力，提供跨进程跨服务的通信机制，分解耗时的大块任务避免阻塞用户响应。队列中有两个核心概念：producer和consumer。顾名思义，producer负责向队列中添加任务，consumer负责处理队列中的任务。

## producer
producer 将一个处理任务添加到任务队列中，比如我们需要添加一个音频文件的转码任务。那么，我们首先使用`InjectQueue`声明了一个名为`audio`的队列，收到客户端请求后，创建一个名为`transcode`的任务。任务的通常使用json来定义。
```ts
import { InjectQueue } from '@nestjs/bull';
import { Controller, Post } from '@nestjs/common';
import {Queue} from 'bull'

@Controller('audio')
export class AudioController {
    constructor(@InjectQueue('audio') private readonly audioQueue: Queue) {}
    @Post('transcode')
    async transcode() {
        await this.audioQueue.add('transcode', {file: 'audio.mp3'});
    }
}

```
## consumer
`consumer` 中可以监听队列的状态以及处理对应的任务，当主进程空闲时，从队列中顺次拉取任务进行处理。
### 如何定义 `consumer`？
使用`Processor`来定义`consumer`，下面我们就定义了一个`consumer`，它只会处理`audio`队列中的任务。
```ts
import { Processor } from '@nestjs/bull';

@Processor('audio')
export class AudioConsumer {}
```
### 处理队列任务
在`consumer`中，使用`Process`定义一个任务处理器，下面我们定义了一个任务处理器，它只会处理名为`transcode`的任务。
```ts
import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { Job } from "bull";

@Processor('audio')
export class AudioProcessor {
    private readonly logger = new Logger(AudioProcessor.name)
    @Process('transcode')
    handleTranscode(job: Job) {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
        this.logger.debug('Transcoding completed');
    }
}
```
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
