import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { ToDoService } from './to-do/to-do/to-do.service';
import { ToDo } from './to-do/to-do';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  root(): string {
    return 'hello';
  }
}
