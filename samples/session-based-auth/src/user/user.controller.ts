/*
 * @Author: ant
 * @Date: 2023-06-14 15:04:12
 * @LastEditTime: 2023-06-14 20:04:20
 * @LastEditors: ant
 * @Description: 
 */
import { Controller, Get, Post, Body, Param, Request, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { createHmac } from 'node:crypto';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { SessionGuard } from 'src/auth/session.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async create(@Body('name') name: string, @Body('password') password: string) {
    const passHash = createHmac('sha256', password).digest('hex');
    const res = await this.userService.create({name, password: passHash});
    return {code: 0, data: {name: res.name, id: res.id}, msg: 'success'};
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    console.log('req.user in login', req.user);
    // return this.userService.login(req.user);
    return {code: 0,  msg: 'success', data: req.user};
  }

  @UseGuards(SessionGuard)
  @Get('profile')
  getProfile(@Request() req): any {
    console.log('protected', req.user)
    return {code: 0, msg: 'success', data: req.user};
  }

  @Get('logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { code: 0, msg: 'success', data: null };
  }

  @Get('list')
  @UseGuards(SessionGuard)
  async findAll() {
    const users = await this.userService.findAll();
    return {code: 0, msg: 'success', data: users};
  }

}
