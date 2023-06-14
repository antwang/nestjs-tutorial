/*
 * @Author: ant
 * @Date: 2023-06-14 15:04:12
 * @LastEditTime: 2023-06-14 16:33:15
 * @LastEditors: ant
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User]),],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
