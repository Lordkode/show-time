import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { TicketsModule } from './tickets/tickets.module';
import { EventService } from './service/event/event.service';
import { EventController } from './controller/event/event.controller';
import { UsersModule } from './modules/users/users.module';
import { EventSchema } from './Schema/events.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: `mongodb+srv://${configService.get<string>('DB_USER')}:${encodeURIComponent(configService.get<string>('DB_PASSWORD'))}@${configService.get<string>('DB_HOST')}/${configService.get<string>('DB_NAME')}?retryWrites=true&w=majority`,
      }),
    }),
    AuthModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
      }),
    }),
    TicketsModule,
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    UsersModule,
  ],
  controllers: [AppController, EventController],
  providers: [AppService, JwtStrategy, EventService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
