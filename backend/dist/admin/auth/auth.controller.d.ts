import { Role } from "../../common/constants/role.constant";
import { AuthService } from "./auth.service";
import { CreateAdminDto } from "./dto/admin.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createAdminDto: CreateAdminDto): Promise<any>;
    login(req: Express.Request): Promise<{
        user: {
            id: number;
            email: string;
            role: Role.ADMIN;
            name: string;
        };
        accessToken: string;
    }>;
}
