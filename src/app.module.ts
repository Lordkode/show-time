import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';

const DB_USER = "eventxAdmin"
const DB_PASSWORD = encodeURIComponent("eventx2024*#NestJs")
@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@eventx.gmopg.mongodb.net/?retryWrites=true&w=majority&appName=eventx`), AuthModule, PassportModule, JwtModule.registerAsync({
    imports:  [ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') },
    }),  })],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
