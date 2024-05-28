import * as express from 'express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ValidationPipe } from '@nestjs/common'
import { GlobalExceptionFilter } from './util/errorHandler'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT: number = parseInt(process.env.PORT, 10) || 3001

  app.enableCors({
    origin: '*',
    optionsSuccessStatus: 200,
    methods: 'GET,PUT,PATCH,POST,DELETE',
  })
  app.use(express.json({ limit: 10 << 20 }))

  app.useGlobalFilters(new GlobalExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true, transform: true }),
  )

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Omega Loan')
    .setDescription('API Endpoints for Omega Loan')
    .setVersion('1.2.7')

    .addServer('https://api.omegasupportaccessltd.com', 'Production')
    .addServer(`http://localhost:${PORT}`, 'Local environment')
    .addBearerAuth(
      { type: 'http', scheme: 'Bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build()

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('api-docs', app, swaggerDocument)

  try {
    await app.listen(PORT)
    console.log(`Server is running on http://localhost:${PORT}`)
  } catch (error) {
    console.error(`Error starting the server: ${error.message}`)
  }
}
bootstrap()
