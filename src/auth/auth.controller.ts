import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Res,
  HttpStatus,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenBlacklistService } from './token-blacklist.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private tokenBlacklistService: TokenBlacklistService,
  ) {}

  @Get('/admin')
  async home(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    response.render('admin/index', { isAuthenticated });
  }

  @Get('/login')
  loginPage(@Res() response: Response) {
    response.render('login');
  }

  @Get('/register')
  registerPage(@Res() response: Response) {
    response.render('register');
  }

  @Post('/register')
  @Redirect('auth/login')
  async register(
    @Body()
    body: { username: string; email: string; password: string; phone: number },
    @Res() res: Response,
  ) {
    try {
      const user = await this.authService.register(
        body.username,
        body.email,
        body.password,
        body.phone,
        res,
      );
      return res.redirect('/');
    } catch (error) {
      return res.redirect('/');
    }
  }

  @Post('/login')
  @Redirect('users/dash')
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (user) {
      const isAdmin = user.is_admin;
      await this.authService.login(user, res);
      if (isAdmin) {
        return res.redirect('/auth/admin/');
      } else {
        return res.redirect('/');
      }
    } else {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }
  }

  @Post('logout')
  async logout(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    if (accessToken) {
      await this.tokenBlacklistService.blacklistToken(accessToken);
      response.clearCookie('access_token');
      return response.redirect('/');
    } else {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'No access token found' });
    }
  }
}
