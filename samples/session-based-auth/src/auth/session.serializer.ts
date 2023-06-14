/*
 * @Author: ant
 * @Date: 2023-06-14 17:48:00
 * @LastEditTime: 2023-06-14 17:51:20
 * @LastEditors: ant
 * @Description: 
 */
import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer{
    serializeUser(user, done){
        done(null, user);
    }
    deserializeUser(user, done){
        done(null, user);
    }
}