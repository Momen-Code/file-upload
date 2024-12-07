import { Role } from "../../../common/constants/role.constant";
export declare class Admin {
    private readonly id?;
    name: string;
    email: string;
    role: Role.ADMIN;
    password: string;
}
