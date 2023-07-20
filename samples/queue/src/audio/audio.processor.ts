/*
 * @Author: ant
 * @Date: 2023-07-14 19:57:56
 * @LastEditTime: 2023-07-14 20:02:45
 * @LastEditors: ant
 * @Description: 
 */

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