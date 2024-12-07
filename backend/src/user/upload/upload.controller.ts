import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
  Get,
  Param,
  Query,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FilesInterceptor } from "@nestjs/platform-express";

@Controller("upload")
export class UploadController {
  constructor(private readonly fileUploadService: UploadService) {}

  @Post()
  @UseInterceptors(FilesInterceptor("files", 10)) // Handle multiple files, up to 10
  async uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return this.fileUploadService.handleFileUpload(files);
  }

  //   @Get()
  //   async getFiles(@Query() query: FileQueryDto) {
  //     return this.fileUploadService.getFiles(query);
  //   }

  //   @Get(":id")
  //   async getFile(@Param("id") id: string) {
  //     return this.fileUploadService.getFile(id);
  //   }
}
