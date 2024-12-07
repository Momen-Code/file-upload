import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy, "user") {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(
        configService.get("access").USER_PUBLIC_KEY,
        "base64"
      ).toString("ascii"),
      algorithms: ["RS256"],
    } as StrategyOptions);
  }

  async validate(payload: any) {
    return {
      id: payload.id,
      name: payload.name,
      role: payload.role,
      email: payload.email,
    };
  }
}
