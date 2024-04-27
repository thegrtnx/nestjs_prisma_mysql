import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));

  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local environment')
    .addServer('https://staging.yourapi.com', 'Staging')
    .addServer('https://production.yourapi.com', 'Production')
    .addTag('App', 'Endpoint for server test')
    .addTag('Auth', 'Endpoint for authentication')
    .addTag('Customers', 'Endpoint for customers')
    .addTag('Guarantors', 'Endpoint for Guarantors')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(3000);
}
bootstrap();
