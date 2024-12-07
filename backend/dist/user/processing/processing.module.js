"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessingModule = void 0;
const common_1 = require("@nestjs/common");
const bull_1 = require("@nestjs/bull");
const file_processor_1 = require("./processers/file.processor");
const prisma_service_1 = require("../../shared/prisma/prisma.service");
const processing_service_1 = require("./processing.service");
let ProcessingModule = class ProcessingModule {
};
ProcessingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({
                name: "file-processing",
            }),
        ],
        providers: [file_processor_1.FileProcessor, processing_service_1.ProcessingService, prisma_service_1.PrismaService],
    })
], ProcessingModule);
exports.ProcessingModule = ProcessingModule;
//# sourceMappingURL=processing.module.js.map