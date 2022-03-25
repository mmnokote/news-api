import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/runseeder')
  async syncData(): Promise<any> {
    await this.appService.seeder();
    return 'seed completed';
  }
}
