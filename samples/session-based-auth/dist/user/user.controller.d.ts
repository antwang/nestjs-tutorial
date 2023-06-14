import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(name: string, password: string): Promise<{
        code: number;
        data: {
            name: string;
            id: number;
        };
        msg: string;
    }>;
    login(req: any): any;
    getProfile(req: any): any;
    logout(req: any): any;
    findAll(): Promise<{
        code: number;
        msg: string;
        data: import("./entities/user.entity").User[];
    }>;
}
