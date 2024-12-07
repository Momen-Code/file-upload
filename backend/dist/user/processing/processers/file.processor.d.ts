import { Job } from "bull";
import { ProcessingService } from "../processing.service";
export declare class FileProcessor {
    private readonly processingService;
    constructor(processingService: ProcessingService);
    handleFileProcessing(job: Job<{
        fileId: string;
        filePath: string;
    }>): Promise<void>;
}
