/*
 * @Author: ant
 * @Date: 2023-06-14 11:30:56
 * @LastEditTime: 2023-06-16 15:26:38
 * @LastEditors: ant
 * @Description: 
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
import * as passport from "passport"
import RedisStore from "connect-redis"
import {createClient} from "redis"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  let redisClient = createClient()
  redisClient.connect().catch((err) => {
    console.log(err);
  })

  let redisStore = new RedisStore({
    client: redisClient
  })
  app.use(
    session({
      secret: 'secret dont tell anyone',
      store: redisStore,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24
      },
      resave: false,
      saveUninitialized: false,
      name: 'IPSCAS',
    })
  )
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3000);
}
bootstrap();
