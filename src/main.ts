import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { GlobalExceptionFilter } from './util/errorHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: true,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  app.use(cookieParser());
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, transform: true }),
  );

  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')

    .addServer('http://localhost:3000', 'Local environment')
    //.addServer('https://staging.yourapi.com', 'Staging')
    // .addServer('https://api.omegasupportaccessltd.com/', 'Production')
    //.addServer('https://api.omegasupportaccessltd.com/', 'Production')
    //.addServer('http://localhost:3001', 'Local environment')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' },
      'authorization',
    )
    .addTag('App', 'Endpoint for server test')
    .addTag('Auth', 'Endpoint for authentication')
    .addTag('Customers', 'Endpoint for customers')
    .addTag('Guarantors', 'Endpoint for Guarantors')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      //operationsSorter: 'alpha',
    },
  });

  await app.listen(3001);
}
bootstrap();
