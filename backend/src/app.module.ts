import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AdminModule } from "./admin/admin.module";
import { JwtAuthGuard } from "./common/guards";
import configuration from "./config/envs";
import { UserModule } from "./user/user.module";
import { BullModule } from "@nestjs/bull";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log("bull config", configService.get("redis").host);
        return {
          redis: {
            host: configService.get("redis").host,
            port: 6379,
            password: configService.get("redis").password,
          },
        };
      },
      inject: [ConfigService],
    }),
    AdminModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
