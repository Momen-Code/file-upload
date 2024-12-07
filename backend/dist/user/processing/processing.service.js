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
var ProcessingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const csvParser = require("papaparse");
const pdf_parse_1 = require("pdf-parse");
const Tesseract = require("tesseract.js");
const xlsx = require("xlsx");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
let ProcessingService = ProcessingService_1 = class ProcessingService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ProcessingService_1.name);
    }
    async processFile(filePath, fileId) {
        this.logger.log(`Processing file: ${filePath}`);
        const file = await this.prisma.file.findUnique({ where: { id: fileId } });
        if (!file) {
            this.logger.error(`File with ID ${fileId} not found`);
            throw new Error("File not found");
        }
        try {
            let metadata;
            switch (file.mimetype) {
                case "application/pdf":
                    metadata = await this.extractPdfText(filePath);
                    break;
                case "image/jpeg":
                case "image/png":
                    metadata = await this.extractImageText(filePath);
                    break;
                case "text/csv":
                    metadata = await this.parseCsv(filePath);
                    break;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    metadata = await this.parseExcel(filePath);
                    break;
                default:
                    this.logger.error(`Unsupported file type: ${file.mimetype}`);
                    throw new Error(`Unsupported file type: ${file.mimetype}`);
            }
            await this.storeMetadata(fileId, metadata);
            await this.prisma.file.update({
                where: { id: fileId },
                data: { status: "COMPLETED", updatedAt: new Date() },
            });
            this.logger.log(`Processing completed for file: ${filePath}`);
        }
        catch (error) {
            await this.prisma.file.update({
                where: { id: fileId },
                data: { status: "FAILED", updatedAt: new Date() },
            });
            this.logger.error(`Processing failed for file: ${filePath}`, error.message);
            throw error;
        }
    }
    async extractPdfText(filePath) {
        const pdfBuffer = fs.readFileSync(filePath);
        const pdfData = await (0, pdf_parse_1.default)(pdfBuffer);
        return { textContent: pdfData.text.trim() };
    }
    async extractImageText(filePath) {
        const result = await Tesseract.recognize(filePath, "eng");
        return { textContent: result.data.text.trim() };
    }
    async parseCsv(filePath) {
        const csvString = fs.readFileSync(filePath, "utf8");
        const parsedData = csvParser.parse(csvString, { header: true });
        return { csvData: JSON.stringify(parsedData.data) };
    }
    async parseExcel(filePath) {
        const workbook = xlsx.readFile(filePath);
        const sheetNames = workbook.SheetNames;
        const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
        return { excelData: JSON.stringify(sheetData) };
    }
    async storeMetadata(fileId, metadata) {
        const { textContent, csvData, excelData, thumbnail } = metadata;
        const createdMetadata = await this.prisma.metadata.create({
            data: {
                textContent: textContent || null,
                csvData: csvData || null,
                excelData: excelData || null,
                thumbnail: thumbnail || null,
            },
        });
        await this.prisma.file.update({
            where: { id: fileId },
            data: { metadataId: createdMetadata.id },
        });
        this.logger.log(`Metadata stored for file: ${fileId}`);
    }
};
ProcessingService = ProcessingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProcessingService);
exports.ProcessingService = ProcessingService;
//# sourceMappingURL=processing.service.js.map