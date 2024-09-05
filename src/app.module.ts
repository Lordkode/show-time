import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './service/event/event.service';
import { EventController } from './controller/event/event.controller';
import { EventSchema } from './Schema/events.schema';

const DB_USER = 'eventxAdmin';
const DB_PASSWORD = encodeURIComponent('eventx2024*#NestJs');
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@eventx.gmopg.mongodb.net/?retryWrites=true&w=majority&appName=eventx`,
    ),
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
  ],
  controllers: [AppController, EventController],
  providers: [AppService, EventService],
})
export class AppModule {}
