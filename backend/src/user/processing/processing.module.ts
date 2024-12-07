import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bull";
import { FileProcessor } from "./processers/file.processor";
import { PrismaService } from "../../shared/prisma/prisma.service";
import { ProcessingService } from "./processing.service";

@Module({
  imports: [
    BullModule.registerQueue({
      name: "file-processing",
    }),
  ],
  providers: [FileProcessor, ProcessingService, PrismaService],
})
export class ProcessingModule {}
