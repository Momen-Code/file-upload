import { Role } from "../../../common/constants/role.constant";

export class User {
  private readonly id?: number;
  name: string;
  email: string;
  role: Role.ADMIN | Role.USER;
  password: string;
}
