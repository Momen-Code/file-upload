import { AuthService } from "./auth.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createAdminDto: CreateAdminDto): Promise<{
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    login(body: any): Promise<{
        access_token: string;
    }>;
}
