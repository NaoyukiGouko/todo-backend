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

  async create(todo: ToDo): Promise<ToDo[]> {
    try {
      await this.todoRepository.save(todo);
    } catch (error){
      console.log(error);
    }
    return await this.findAll();
  }

  async delete(id: number): Promise<ToDo[]> {
    const todo = await this.todoRepository.findOne(id)
    await this.todoRepository.remove(todo)
    return await this.findAll();
  }

  
}
