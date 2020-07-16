import { Injectable } from '@nestjs/common';
import { Todo } from '../to-do';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>){}

  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  async create(todo: Todo): Promise<Todo> {
    return await this.todoRepository.save(todo);
  }

  async delete(id: number): Promise<number> {
    const todo = await this.todoRepository.findOne(id);
    await this.todoRepository.remove(todo);
    return id;
  }

  
}
