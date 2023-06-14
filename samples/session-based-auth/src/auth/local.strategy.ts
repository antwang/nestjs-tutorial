/*
 * @Author: ant
 * @Date: 2023-06-14 16:29:05
 * @LastEditTime: 2023-06-14 16:35:13
 * @LastEditors: ant
 * @Description: 
 */
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: "name",
            passwordField: "password",
        });
    }
    async validate(name: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(name, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}