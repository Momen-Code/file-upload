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
import { User } from "./entity/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async register(user: User) {
    const isExist = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (isExist) {
      throw new ConflictException("User already registered!");
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new NotFoundException(message.USER.NotFound);

    if (user && bcrypt.compareSync(password, user.password)) {
      return {
        ...omit(user, ["user.password"]),
      };
    }
    return null;
  }

  async login(user: Express.User) {
    try {
      const payload = this.createPayload(user as User);
      return {
        user: payload,
        accessToken: this.signJwt(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  private createPayload(user: User) {
    return {
      id: user["id"],
      email: user.email,
      role: user.role,
      name: user.name,
    };
  }

  private signJwt(payload: any) {
    return this.jwtService.sign(payload, {
      privateKey: Buffer.from(
        this.configService.get("access").USER_PRIVATE_KEY,
        "base64"
      ).toString("ascii"),
      algorithm: "RS256",
    });
  }
}
