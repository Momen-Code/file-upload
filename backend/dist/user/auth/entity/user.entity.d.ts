import { Role } from "../../../common/constants/role.constant";
export declare class User {
    private readonly id?;
    name: string;
    email: string;
    role: Role.ADMIN | Role.USER;
    password: string;
}
