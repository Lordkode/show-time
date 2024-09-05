import * as dotenv from 'dotenv'
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, "..", "views"))
  app.useStaticAssets(join(__dirname, "..", "public"))
  app.setViewEngine("ejs")
  app.use(cookieParser());
  await app.listen(process.env.PORT);
}
bootstrap();
