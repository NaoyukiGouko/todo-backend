import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param
} from '@nestjs/common';
import { ToDoService } from './to-do.service';
import { ToDo } from '../to-do';

@Controller('')
export class ToDoController {
  constructor(private readonly todoService: ToDoService){}
  @Get()
  async findAll(): Promise<ToDo[]> {
    return this.todoService.findAll();
  }

  @Post('create')
  async create(@Body() todo: ToDo): Promise<ToDo[]> {
    return this.todoService.create(todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<ToDo[]> {
    return this.todoService.delete(id);
  }
}
