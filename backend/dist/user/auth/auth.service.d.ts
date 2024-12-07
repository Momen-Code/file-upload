/// <reference types="passport" />
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { User } from "./entity/user.entity";
export declare class AuthService {
    private jwtService;
    private prisma;
    private readonly configService;
    constructor(jwtService: JwtService, prisma: PrismaService, configService: ConfigService);
    register(user: User): Promise<any>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: Express.User): Promise<{
        user: {
            id: number;
            email: string;
            role: import("../../common/constants/role.constant").Role;
            name: string;
        };
        accessToken: string;
    }>;
    private createPayload;
    private signJwt;
}
