"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
let UploadService = class UploadService {
    constructor(fileQueue, prisma) {
        this.fileQueue = fileQueue;
        this.prisma = prisma;
    }
    async handleFileUpload(files, userId) {
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
    async getFiles(query) {
        const { page = 1, limit = 10 } = query;
        return this.prisma.file.findMany({
            skip: (page - 1) * limit,
            take: limit,
        });
    }
    async getFile(id) {
        return this.prisma.file.findUnique({
            where: { id },
            include: { processingLogs: true },
        });
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)("file-processing")),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map