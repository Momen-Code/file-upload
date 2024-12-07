import { BullModule } from "@nestjs/bull";
import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { UploadController } from "./upload.controller";
import { UploadService } from "./upload.service";
import { FileValidationMiddleware } from "../../common/middlewares/file-validation.middleware";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "file-processing",
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService, PrismaService],
})
export class UploadModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FileValidationMiddleware) // Apply the middleware
      .forRoutes("/user/upload"); // Specify the route(s) it applies to
  }
}
