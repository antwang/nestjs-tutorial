/*
 * @Author: ant
 * @Date: 2023-06-14 11:30:56
 * @LastEditTime: 2023-06-14 16:00:38
 * @LastEditors: ant
 * @Description: 
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'ant.suanshubang.com',
    port: 3306,
    username: 'root',
    password: '123456abc',
    database: 'nest',
    autoLoadEntities: true,
    // don't use synchronize: true in production
    synchronize: true,
  }), UserModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
