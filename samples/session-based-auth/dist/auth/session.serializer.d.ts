import { PassportSerializer } from "@nestjs/passport";
export declare class SessionSerializer extends PassportSerializer {
    serializeUser(user: any, done: any): void;
    deserializeUser(user: any, done: any): void;
}
