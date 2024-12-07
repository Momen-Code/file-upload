"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const Queue = require("bull");
const bull_board_1 = require("bull-board");
const bullAdapter_1 = require("bull-board/bullAdapter");
const express_1 = require("express");
const basicAuth = require("express-basic-auth");
const app_module_1 = require("./app.module");
const rest_logging_1 = require("./common/blocks/interceptors/rest-logging");
const swagger_config_1 = require("./config/docs/swagger.config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const port = config.get("port");
    const document = swagger_1.SwaggerModule.createDocument(app, swagger_config_1.swaggerUi);
    swagger_1.SwaggerModule.setup("api-docs", app, document);
    app.useGlobalInterceptors(new rest_logging_1.RestLoggingInterceptor());
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use((0, express_1.json)({ limit: "5mb" }));
    app.use((0, express_1.urlencoded)({ extended: true }));
    app.enableCors();
    const redis = config.get("redis");
    const redisOptions = {
        host: redis.host,
    };
    const fileProcessingQueue = new Queue("file-processing", {
        redis: redisOptions,
    });
    const { router } = (0, bull_board_1.createBullBoard)([new bullAdapter_1.BullAdapter(fileProcessingQueue)]);
    app.use("/bull", basicAuth({
        users: { admin: "JBFx@#hW&skYXs^u" },
        challenge: true,
        unauthorizedResponse: "Sorry , Please refresh then enter bull board username and password",
    }), router);
    await app.listen(port, () => {
        console.warn(`Server running on port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map