import { Process, Processor } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Job } from "bull";
import { ProcessingService } from "../processing.service";

@Injectable()
@Processor("file-processing")
export class FileProcessor {
  constructor(private readonly processingService: ProcessingService) {}

  @Process("process-file")
  async handleFileProcessing(job: Job<{ fileId: string; filePath: string }>) {
    const { fileId, filePath } = job.data;
    await this.processingService.processFile(filePath, fileId);
  }
}
