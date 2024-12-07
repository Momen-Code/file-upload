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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const processing_service_1 = require("../processing.service");
let FileProcessor = class FileProcessor {
    constructor(processingService) {
        this.processingService = processingService;
    }
    async handleFileProcessing(job) {
        const { fileId, filePath } = job.data;
        await this.processingService.processFile(filePath, fileId);
    }
};
__decorate([
    (0, bull_1.Process)("process-file"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileProcessor.prototype, "handleFileProcessing", null);
FileProcessor = __decorate([
    (0, common_1.Injectable)(),
    (0, bull_1.Processor)("file-processing"),
    __metadata("design:paramtypes", [processing_service_1.ProcessingService])
], FileProcessor);
exports.FileProcessor = FileProcessor;
//# sourceMappingURL=file.processor.js.map