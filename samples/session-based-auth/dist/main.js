"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const connect_redis_1 = require("connect-redis");
const redis_1 = require("redis");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    let redisClient = (0, redis_1.createClient)();
    redisClient.connect().catch((err) => {
        console.log(err);
    });
    let redisStore = new connect_redis_1.default({
        client: redisClient
    });
    app.use(session({
        secret: 'secret dont tell anyone',
        store: redisStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        resave: false,
        saveUninitialized: false,
        name: 'IPSCAS',
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map