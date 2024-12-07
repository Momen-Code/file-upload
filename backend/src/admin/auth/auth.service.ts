import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { omit } from "lodash";
import { message } from "../../common/constants/messages.constant";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { Admin } from "./entity/admin.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async register(admin: Admin) {
    const isExist = await this.prisma.user.findUnique({
      where: { email: admin.email },
    });
    if (isExist) {
      throw new ConflictException("User already registered!");
    }
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    return this.prisma.user.create({
      data: {
        ...admin,
        password: hashedPassword,
      },
    });
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!admin) throw new NotFoundException(message.USER.NotFound);

    if (admin && bcrypt.compareSync(password, admin.password)) {
      return {
        ...omit(admin, ["admin.password"]),
      };
    }
    return null;
  }

  async login(user: Express.User) {
    try {
      const payload = this.createPayload(user as Admin);
      return {
        user: payload,
        accessToken: this.signJwt(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  private createPayload(admin: Admin) {
    return {
      id: admin["id"],
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };
  }

  private signJwt(payload: any) {
    return this.jwtService.sign(payload, {
      privateKey: Buffer.from(
        this.configService.get("access").ADMIN_PRIVATE_KEY,
        "base64"
      ).toString("ascii"),
      algorithm: "RS256",
    });
  }
}
