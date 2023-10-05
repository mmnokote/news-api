import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { LocalAuthGuard } from './auth/local-auth-guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  // constructor(private readonly appService: AppService) {}

  // @Get('/runseeder')
  // async syncData(): Promise<any> {
  //   await this.appService.seeder();
  //   return 'seed completed';
  // }

  //PostLogin
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req): Promise<any> {
    return this.authService.login(req.user); //retutn JWT access token
  }

  // @UseGuards(AuthenticatedGuard) //check if the user is loged in
  @Get('/protected')
  getHellow(@Request() req): Promise<any> {
    return req.user;
  }
}
