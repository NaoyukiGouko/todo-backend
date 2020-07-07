import {
    Controller,
    Post,
    Get,
    Body,
    Param
  } from '@nestjs/common';
  import { ToDoService } from './to-do.service';
import { ToDo } from '../to-do';

@Controller('')
export class ToDoController {
    constructor(private readonly todoService: ToDoService){}
    @Get()
    //@Render('index')
    async findAll(): Promise<ToDo[]> {
        return this.todoService.findAll();
    }

    @Post('create')
    async create(@Body('title')title: string): Promise<ToDo[]> {
        return this.todoService.create(title);
    }

    @Post(':id')
    //@Render('index')
    async delete(@Param('id') id: number): Promise<ToDo[]> {
        return this.todoService.delete(id);
    }
}
