import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerUi = new DocumentBuilder()
  .setTitle("File Upload System API")
  .setDescription("File Upload System")
  .setVersion("1.0")
  .addBearerAuth()
  .build();
