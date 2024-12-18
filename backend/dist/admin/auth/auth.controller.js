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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const role_constant_1 = require("../../common/constants/role.constant");
const decorators_1 = require("../../common/decorators");
const auth_service_1 = require("./auth.service");
const admin_dto_1 = require("./dto/admin.dto");
const swagger_constant_1 = require("../../common/constants/swagger.constant");
const passport_1 = require("@nestjs/passport");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(createAdminDto) {
        return this.authService.register({ ...createAdminDto, role: role_constant_1.Role.ADMIN });
    }
    async login(req) {
        return this.authService.login(req.user);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("register"),
    (0, swagger_1.ApiOperation)({ summary: "Register a new Admin" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "The admin has been successfully created.",
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: "Bad request. Validation failed.",
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateAdminDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("local-admin")),
    (0, swagger_1.ApiResponse)({
        description: "The admin has logged in successfully.",
        status: 201,
    }),
    (0, swagger_1.ApiBody)({
        type: admin_dto_1.LoginDto,
    }),
    (0, swagger_1.ApiOperation)({ summary: "Login" }),
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)(swagger_constant_1.swagger.ADMIN_AUTH),
    (0, common_1.Controller)("admin/auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map