import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // API prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('SkillConnect JK API')
    .setDescription(
      `
      API for SkillConnect JK - Outcome-linked skilling credit platform for Jammu & Kashmir.
      
      ## Features
      - User authentication and KYC verification
      - Course catalog management
      - Loan application and processing
      - Milestone-based disbursement
      - Training provider management
      - Bank integration
      
      ## Authentication
      All protected endpoints require a Bearer token in the Authorization header.
      `,
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication and authorization')
    .addTag('users', 'User management')
    .addTag('courses', 'Course catalog')
    .addTag('loans', 'Loan applications and management')
    .addTag('training-providers', 'Training provider operations')
    .addTag('banks', 'Bank integration')
    .addTag('admin', 'Administrative operations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`
    🚀 SkillConnect JK Backend is running!
    
    📍 API:          http://localhost:${port}/api/v1
    📚 Swagger Docs: http://localhost:${port}/api/docs
    🌍 Environment:  ${process.env.NODE_ENV || 'development'}
  `);
}

bootstrap();

