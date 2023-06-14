/*
 * @Author: ant
 * @Date: 2023-06-14 17:05:01
 * @LastEditTime: 2023-06-14 17:58:13
 * @LastEditors: ant
 * @Description: 
 */
import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Injectable()
export class LocalAuthGuard extends AuthGuard("local") {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const result = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return result
    }
}