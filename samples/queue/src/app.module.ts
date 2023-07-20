/*
 * @Author: ant
 * @Date: 2023-07-14 14:57:51
 * @LastEditTime: 2023-07-14 15:31:59
 * @LastEditors: ant
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {BullModule} from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [BullModule.forRoot({
    redis: {
      host: 'localhost',
      port: 6379,
    },
  }), AudioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
