import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import * as yaml from 'yamljs';
import { OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { LoggingService } from './logging/logging.service';
import { AllExceptionsFilter } from './logging/exceptionFilter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  const doc: OpenAPIObject = yaml.load('./doc/api.yaml');
  SwaggerModule.setup('doc', app, doc);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));
  app.use((req, res, next) => {
    loggingService.logRequest(req);
    res.on('finish', () => loggingService.logResponse(res));
    next();
  });
  await app.listen(process.env.PORT || 4000).then(() => {
    logger.log(`Server running on port ${process.env.PORT || 4000}`);
  });
}

bootstrap();
