/*
 * @Author: ant
 * @Date: 2023-07-14 16:46:39
 * @LastEditTime: 2023-07-14 19:58:25
 * @LastEditors: ant
 * @Description: 
 */
import { Module } from '@nestjs/common';
import {BullModule} from '@nestjs/bull';
import { AudioController } from './audio.controller';
import {AudioProcessor} from './audio.processor'

@Module({
    imports: [BullModule.registerQueue({
        name: 'audio',
    })],
    controllers: [AudioController],
    providers: [AudioProcessor],
})
export class AudioModule {}
