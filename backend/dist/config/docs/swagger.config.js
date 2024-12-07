"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUi = void 0;
const swagger_1 = require("@nestjs/swagger");
exports.swaggerUi = new swagger_1.DocumentBuilder()
    .setTitle("File Upload System API")
    .setDescription("File Upload System")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
//# sourceMappingURL=swagger.config.js.map