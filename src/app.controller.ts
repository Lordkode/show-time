import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Get("/register")
  @Render("register")
  register(){}

  @Get("/login")
  @Render("login")
  login(){}
}
