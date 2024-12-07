import { Role } from "../../../common/constants/role.constant";

export class Admin {
  private readonly id?: number;
  name: string;
  email: string;
  role: Role.ADMIN;
  password: string;
}
