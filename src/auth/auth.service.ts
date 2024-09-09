import { Injectable, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from './schemas/user.schema';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(
    username: string, 
    email: string, 
    password: string, 
    phone: number, 
    @Res() res: Response 
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password);
    const newUser = new this.userModel({
      username,
      email,
      password: hashedPassword,
      phone,
    });
    const savedUser = await newUser.save();

    const payload = { email: savedUser.email, sub: savedUser._id };
    const accessToken = this.jwtService.sign(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,  
      secure: process.env.NODE_ENV === 'production',  
      maxAge: 3600000, 
    });

    return savedUser;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (user && await argon2.verify(user.password, password)) {
      return user;
    }
    return null;
  }

  async login(user: User, @Res() res: Response) {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);

    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
    });

    return {
      access_token: accessToken,
    };
  }
}
