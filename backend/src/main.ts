import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import * as Queue from "bull";
import { createBullBoard } from "bull-board";
import { BullAdapter } from "bull-board/bullAdapter";
import { json, urlencoded } from "express";
import * as basicAuth from "express-basic-auth";
import { AppModule } from "./app.module";
import { RestLoggingInterceptor } from "./common/blocks/interceptors/rest-logging";
import { swaggerUi } from "./config/docs/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get("port");

  const document = SwaggerModule.createDocument(app, swaggerUi);
  SwaggerModule.setup("api-docs", app, document);

  app.useGlobalInterceptors(new RestLoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(json({ limit: "5mb" }));
  app.use(urlencoded({ extended: true }));

  app.enableCors();

  const redis = config.get("redis");
  const redisOptions = {
    host: redis.host,
  };

  const fileProcessingQueue = new Queue("file-processing", {
    redis: redisOptions,
  });
  const { router } = createBullBoard([new BullAdapter(fileProcessingQueue)]);

  app.use(
    "/bull",
    basicAuth({
      users: { admin: "JBFx@#hW&skYXs^u" },
      challenge: true,
      unauthorizedResponse:
        "Sorry , Please refresh then enter bull board username and password",
    }),
    router
  );

  await app.listen(port, () => {
    console.warn(`Server running on port ${port}`);
  });
}

bootstrap();
