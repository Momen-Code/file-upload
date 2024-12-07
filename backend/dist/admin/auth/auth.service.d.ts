/// <reference types="passport" />
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { Admin } from "./entity/admin.entity";
export declare class AuthService {
    private jwtService;
    private prisma;
    private readonly configService;
    constructor(jwtService: JwtService, prisma: PrismaService, configService: ConfigService);
    register(admin: Admin): Promise<any>;
    validateAdmin(email: string, password: string): Promise<any>;
    login(user: Express.User): Promise<{
        user: {
            id: number;
            email: string;
            role: import("../../common/constants/role.constant").Role.ADMIN;
            name: string;
        };
        accessToken: string;
    }>;
    private createPayload;
    private signJwt;
}
