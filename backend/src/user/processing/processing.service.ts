import { Injectable, Logger } from "@nestjs/common";
import * as fs from "fs";
import * as csvParser from "papaparse";
import pdfParse from "pdf-parse";
import * as Tesseract from "tesseract.js";
import * as xlsx from "xlsx";
import { PrismaService } from "../../shared/prisma/prisma.service";

@Injectable()
export class ProcessingService {
  private readonly logger = new Logger(ProcessingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async processFile(filePath: string, fileId: string): Promise<void> {
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
    } catch (error) {
      await this.prisma.file.update({
        where: { id: fileId },
        data: { status: "FAILED", updatedAt: new Date() },
      });

      this.logger.error(
        `Processing failed for file: ${filePath}`,
        error.message
      );
      throw error;
    }
  }

  /**
   * Extract text from PDF files
   */
  private async extractPdfText(
    filePath: string
  ): Promise<{ textContent: string }> {
    const pdfBuffer = fs.readFileSync(filePath);

    // Use pdf-parse to extract text content
    const pdfData = await pdfParse(pdfBuffer);

    return { textContent: pdfData.text.trim() };
  }

  /**
   * Perform OCR on images to extract text
   */
  private async extractImageText(
    filePath: string
  ): Promise<{ textContent: string }> {
    const result = await Tesseract.recognize(filePath, "eng");
    return { textContent: result.data.text.trim() };
  }

  /**
   * Parse CSV files into structured data
   */
  private async parseCsv(filePath: string): Promise<{ csvData: string }> {
    const csvString = fs.readFileSync(filePath, "utf8");
    const parsedData = csvParser.parse(csvString, { header: true });
    return { csvData: JSON.stringify(parsedData.data) };
  }

  /**
   * Parse Excel files into structured data
   */
  private async parseExcel(filePath: string): Promise<{ excelData: string }> {
    const workbook = xlsx.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]);
    return { excelData: JSON.stringify(sheetData) };
  }

  /**
   * Store extracted metadata in the database
   */
  private async storeMetadata(fileId: string, metadata: any): Promise<void> {
    const { textContent, csvData, excelData, thumbnail } = metadata;

    // Create the metadata entry
    const createdMetadata = await this.prisma.metadata.create({
      data: {
        textContent: textContent || null,
        csvData: csvData || null,
        excelData: excelData || null,
        thumbnail: thumbnail || null,
      },
    });

    // Link the metadata to the file
    await this.prisma.file.update({
      where: { id: fileId },
      data: { metadataId: createdMetadata.id },
    });

    this.logger.log(`Metadata stored for file: ${fileId}`);
  }
}
