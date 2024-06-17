import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constants';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const port = +configService.get<number>(SERVER_PORT);

   // Configuración específica de CORS
   app.enableCors({
    origin: 'http://localhost:4200', // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

    // Configurar los archivos estáticos
    app.useStaticAssets(join(__dirname, '..', 'pdfs'), {
      prefix: '/pdfs',
    });

  await app.listen(port);
  console.log( await app.getUrl())
}
bootstrap();
