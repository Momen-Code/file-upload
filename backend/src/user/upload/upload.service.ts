import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { PrismaService } from "../../shared/prisma/prisma.service";

@Injectable()
export class UploadService {
  constructor(
    @InjectQueue("file-processing") private readonly fileQueue: Queue,
    private readonly prisma: PrismaService
  ) {}

  async handleFileUpload(files: Express.Multer.File[], userId?: string) {
    const fileMetadataPromises = files.map(async (file) => {
      const metadata = await this.prisma.metadata.create({
        data: {
          textContent: null,
          csvData: null,
          excelData: null,
          thumbnail: null,
        },
      });

      const fileMetadata = await this.prisma.file.create({
        data: {
          name: file.originalname,
          originalName: file.originalname,
          path: `uploads/${file.filename}`,
          mimetype: file.mimetype,
          size: file.size,
          status: "PENDING",
          userId: userId || null,
          metadataId: metadata.id,
        },
      });

      await this.fileQueue.add("process-file", {
        fileId: fileMetadata.id,
        filePath: fileMetadata.path,
      });

      return fileMetadata;
    });

    const fileMetadata = await Promise.all(fileMetadataPromises);
    return fileMetadata;
  }

  async getFiles(query: any) {
    const { page = 1, limit = 10 } = query;
    return this.prisma.file.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getFile(id: string) {
    return this.prisma.file.findUnique({
      where: { id },
      include: { processingLogs: true },
    });
  }
}
