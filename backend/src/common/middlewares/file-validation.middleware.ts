import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from "@nestjs/common";

@Injectable()
export class FileValidationMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const files = req.files;

    if (!files || files.length === 0) {
      throw new BadRequestException("No files uploaded");
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `Unsupported file type: ${file.mimetype}`
        );
      }
    }

    next(); // Proceed to the next middleware or controller
  }
}
