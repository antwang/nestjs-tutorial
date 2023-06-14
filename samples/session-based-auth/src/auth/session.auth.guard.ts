/*
 * @Author: ant
 * @Date: 2023-06-14 17:36:39
 * @LastEditTime: 2023-06-14 17:43:06
 * @LastEditors: ant
 * @Description: 
 */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class SessionGuard implements CanActivate {
    canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        return request.isAuthenticated()
    }
}