/*
 * @Author: ant
 * @Date: 2023-06-14 16:19:28
 * @LastEditTime: 2023-06-14 16:32:05
 * @LastEditors: ant
 * @Description: 
 */
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
