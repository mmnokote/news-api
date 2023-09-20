import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/runseeder')
  async syncData(): Promise<any> {
    await this.appService.seeder();
    return 'seed completed';
  }
  //PostLogin
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return { msg: req.user };
  }

  @UseGuards(AuthenticatedGuard) //check if the user is loged in
  @Get('/protected')
  getHellow(@Request() req): Promise<any> {
    return req.user;
  }
}
