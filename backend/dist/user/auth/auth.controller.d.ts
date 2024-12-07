import { Role } from "../../common/constants/role.constant";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dto/user.dto";
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<any>;
    login(req: Express.Request): Promise<{
        user: {
            id: number;
            email: string;
            role: Role;
            name: string;
        };
        accessToken: string;
    }>;
}
