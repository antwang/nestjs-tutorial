/*
 * @Author: ant
 * @Date: 2023-06-14 11:30:56
 * @LastEditTime: 2023-06-14 17:34:48
 * @LastEditors: ant
 * @Description: 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: 'secret dont tell anyone',
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
