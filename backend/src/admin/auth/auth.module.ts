import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "../../shared/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AdminStrategy } from "./strategies/admin.strategy";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const { ADMIN_PRIVATE_KEY, ADMIN_PUBLIC_KEY } =
          configService.get("access");
        return {
          privateKey: Buffer.from(ADMIN_PRIVATE_KEY, "base64").toString(
            "ascii"
          ),
          publicKey: Buffer.from(ADMIN_PUBLIC_KEY, "base64").toString("ascii"),
          signOptions: {
            expiresIn: "1y",
            algorithm: "RS256",
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, AdminStrategy],
})
export class AuthModule {}
