/*
 * @Author: ant
 * @Date: 2023-06-21 11:49:36
 * @LastEditTime: 2023-06-21 17:46:07
 * @LastEditors: ant
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ScheduleModule} from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [ScheduleModule.forRoot(), TasksModule, ConfigModule.forRoot({load: [configuration], isGlobal: true}),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
