import { PrismaService } from "../../shared/prisma/prisma.service";
export declare class ProcessingService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    processFile(filePath: string, fileId: string): Promise<void>;
    private extractPdfText;
    private extractImageText;
    private parseCsv;
    private parseExcel;
    private storeMetadata;
}
