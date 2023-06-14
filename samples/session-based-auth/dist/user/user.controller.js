"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const node_crypto_1 = require("node:crypto");
const local_auth_guard_1 = require("../auth/local.auth.guard");
const session_auth_guard_1 = require("../auth/session.auth.guard");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(name, password) {
        const passHash = (0, node_crypto_1.createHmac)('sha256', password).digest('hex');
        const res = await this.userService.create({ name, password: passHash });
        return { code: 0, data: { name: res.name, id: res.id }, msg: 'success' };
    }
    login(req) {
        console.log('req.user in login', req.user);
        return { code: 0, msg: 'success', data: req.user };
    }
    getProfile(req) {
        console.log('protected', req.user);
        return { code: 0, msg: 'success', data: req.user };
    }
    logout(req) {
        req.session.destroy();
        return { code: 0, msg: 'success', data: null };
    }
    async findAll() {
        const users = await this.userService.findAll();
        return { code: 0, msg: 'success', data: users };
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)('name')),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(session_auth_guard_1.SessionGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('list'),
    (0, common_1.UseGuards)(session_auth_guard_1.SessionGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map