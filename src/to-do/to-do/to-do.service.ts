import { Injectable } from '@nestjs/common';
import { ToDo } from '../to-do';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ToDoService {
  constructor(
    @InjectRepository(ToDo)
    private readonly todoRepository: Repository<ToDo>){}

  async findAll(): Promise<ToDo[]> {
    return await this.todoRepository.find();
  }

  async create(title: string, limit: Date | null): Promise<ToDo> {
    const todo = new ToDo();
    todo.title = title;
    todo.limit = limit;
    const newTodo = await this.todoRepository.save(todo);
    return newTodo;
  }

  async delete(id: number): Promise<number> {
    const todo = await this.todoRepository.findOne(id);
    await this.todoRepository.remove(todo);
    return id;
  }

  
}
