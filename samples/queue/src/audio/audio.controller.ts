/*
 * @Author: ant
 * @Date: 2023-07-14 19:52:03
 * @LastEditTime: 2023-07-14 20:07:57
 * @LastEditors: ant
 * @Description: 
 */
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
