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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const lodash_1 = require("lodash");
const messages_constant_1 = require("../../common/constants/messages.constant");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
let AuthService = class AuthService {
    constructor(jwtService, prisma, configService) {
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.configService = configService;
    }
    async register(admin) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        return this.prisma.user.create({
            data: {
                ...admin,
                password: hashedPassword,
            },
        });
    }
    async validateAdmin(email, password) {
        const admin = await this.prisma.user.findUnique({
            where: { email: email },
        });
        if (!admin)
            throw new common_1.NotFoundException(messages_constant_1.message.USER.NotFound);
        if (admin && bcrypt.compareSync(password, admin.password)) {
            return {
                ...(0, lodash_1.omit)(admin, ["admin.password"]),
            };
        }
        return null;
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException("Invalid credentials");
        }
        const payload = { sub: user.id, role: user.role };
        const token = this.jwtService.sign(payload);
        return { access_token: token };
    }
    createPayload(admin) {
        return {
            id: admin["id"],
            email: admin.email,
            role: admin.role,
            name: admin.name,
        };
    }
    signJwt(payload) {
        return this.jwtService.sign(payload, {
            privateKey: Buffer.from(this.configService.get("access").PRIVATE_KEY, "base64").toString("ascii"),
            algorithm: "RS256",
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService,
        config_1.ConfigService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map