import { TestingModuleBuilder } from "@nestjs/testing";

/*
 * @Author: ant
 * @Date: 2023-06-21 17:42:02
 * @LastEditTime: 2023-06-21 17:45:01
 * @LastEditors: ant
 * @Description: 
 */
export default () => {
    return {
        port: process.env.PORT || 3000,
        jwtSecret: 'jwt secret do not tell any one',
        mysql: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '123456',
            database: 'nest',
        }
    };
};