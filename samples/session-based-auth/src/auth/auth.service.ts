/*
 * @Author: ant
 * @Date: 2023-06-14 16:19:28
 * @LastEditTime: 2023-06-14 17:20:06
 * @LastEditors: ant
 * @Description: 
 */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac } from 'node:crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}
  async validateUser(name: string, pass: string): Promise<any> {
    const user = await this.userService.getUserByName(name);
    const passHash = createHmac('sha256', pass).digest('hex');
    if(user?.password !== passHash) {
      throw new UnauthorizedException()
    }
    const { password, ...result } = user;
    return result
  }
}
