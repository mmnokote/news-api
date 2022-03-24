import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get('/mnokote')
  mnokote(): string {
    return this.appService.getMnokote();
  }
  @Get()
  async syncData(): Promise<any> {
    await this.appService.seeder();
    return 'seed completed';
  }
}
