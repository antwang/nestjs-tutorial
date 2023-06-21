/*
 * @Author: ant
 * @Date: 2023-06-21 16:46:06
 * @LastEditTime: 2023-06-21 17:49:10
 * @LastEditors: ant
 * @Description: 
 */
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);
    constructor(private readonly configService: ConfigService) {
    }
    @Cron('45 * * * * *')
    handleCron() {
        this.logger.log('每当秒数为45的时候执行');
    }
    
    @Interval(10000)
    handleInterval() {
        this.logger.log('每10秒执行一次');
    }
    @Timeout(5000)
    handleTimeout() {
        this.logger.log('5秒后执行');
        let mysql = this.configService.get('mysql');
        this.logger.log('mysql配置信息：',mysql);
    }
}
