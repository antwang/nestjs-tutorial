/*
 * @Author: ant
 * @Date: 2023-07-14 14:57:51
 * @LastEditTime: 2023-07-14 16:43:34
 * @LastEditors: ant
 * @Description: 
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Ant!';
  }
}
