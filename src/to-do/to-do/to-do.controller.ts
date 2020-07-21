import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { TodoService } from './to-do.service';
import { Todo } from '../to-do';

@Controller('')
export class TodoController {
  constructor(private readonly todoService: TodoService){}
  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Post('create')
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.todoService.delete(id);
  }
}
