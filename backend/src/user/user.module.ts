import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { RolesGuard } from "../common/guards";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [AuthModule, UploadModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class UserModule {}
