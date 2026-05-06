import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);
  const port = configService.get<number>('PORT') || 3000;

  // Global Guards (JWT must run before Roles)
  app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));

  // Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips fields not in the DTO
      forbidNonWhitelisted: true, // throws error if unknown fields are sent
      transform: true, // auto-converts strings to numbers
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: http://localhost:3000`);
}

bootstrap().catch((err) => {
  console.error('App failed to start', err);
});
