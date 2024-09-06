import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  async home(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    response.render('index', { isAuthenticated });
  }

  @Get('/index')
  @Render('home')
  async index(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    response.render('home', { isAuthenticated });
  }

  @Get('/buy-tickets')
  @Render('tickets/buy')
  async buy_ticket(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    response.render('tickets/buy', { isAuthenticated });
  }
}
