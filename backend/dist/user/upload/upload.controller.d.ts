/// <reference types="multer" />
import { UploadService } from "./upload.service";
export declare class UploadController {
    private readonly fileUploadService;
    constructor(fileUploadService: UploadService);
    uploadFiles(files: Express.Multer.File[]): Promise<any[]>;
}
