import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from './schemas/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { TokenBlacklistService } from './token-blacklist.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, TokenBlacklistService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
