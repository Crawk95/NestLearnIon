import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet())
  app.enableCors({
    origin: JSON.parse(process.env.ALLOWED_ORIGIN),
    optionsSuccessStatus: 200,
  });

  const config = new DocumentBuilder()
      .setTitle('NestJs Project basic')
      .setDescription('The NestJs API description')
      .setVersion('1.0')
      .addTag('cats')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();