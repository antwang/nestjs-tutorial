/*
 * @Author: ant
 * @Date: 2023-07-20 17:08:17
 * @LastEditTime: 2023-07-21 11:51:36
 * @LastEditors: ant
 * @Description: 
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  uploadFile() {
    throw new Error('Method not implemented.');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
