import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  async home(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token']; 
    const isAuthenticated = !!accessToken; 
    response.render('index', { isAuthenticated });
  }
}
