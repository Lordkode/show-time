import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

const DB_USER = "eventxAdmin"
const DB_PASSWORD = encodeURIComponent("eventx2024*#NestJs")
@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@eventx.gmopg.mongodb.net/?retryWrites=true&w=majority&appName=eventx`)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
