import { Controller, Get, Render, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';
import axios from 'axios';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


  @Get('/')
  @Render('index')
  async home(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    try {
      const eventsResponse = await axios.get('http://localhost:3000/event');
      const events = eventsResponse.data.eventData;  

      response.render('home', { isAuthenticated, events }); 
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error);
      response.render('home', { isAuthenticated, events: [] });
    }
  }

  @Get("/detail_events")
  @Render("detail_events")
  detail_events(){}


  @Get('/index')
  @Render('home')
  async index(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    response.render('index', { isAuthenticated });
  }

  @Get('/buy-tickets')
  @Render('tickets/buy')
  async buy_ticket(@Req() request: Request, @Res() response: Response) {
    const accessToken = request.cookies?.['access_token'];
    const isAuthenticated = !!accessToken;
    response.render('tickets/buy', { isAuthenticated });
  }
}
