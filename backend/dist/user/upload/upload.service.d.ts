/// <reference types="multer" />
import { Queue } from "bull";
import { PrismaService } from "../../shared/prisma/prisma.service";
export declare class UploadService {
    private readonly fileQueue;
    private readonly prisma;
    constructor(fileQueue: Queue, prisma: PrismaService);
    handleFileUpload(files: Express.Multer.File[], userId?: string): Promise<any[]>;
    getFiles(query: any): Promise<any>;
    getFile(id: string): Promise<any>;
}
