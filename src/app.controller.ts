import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('index')
  getHello() {}

  @Get('/register')
  @Render('register')
  register() {}

  @Get('/login')
  @Render('login')
  login() {}

  @Get('/add-event')
  @Render('add-event')
  addEvent() {}
}
