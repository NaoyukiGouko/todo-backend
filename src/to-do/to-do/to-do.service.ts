import { Injectable } from '@nestjs/common';
import { ToDo } from '../to-do';
//import { createConnection, ConnectionOptions, Connection, Repository} from 'typeorm';
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

    /*async post(todo: string): Promise<ToDo> {

    }*/

    async create(title: string, limit: Date | null): Promise<ToDo[]> {
        const todo = new ToDo();
        todo.title = title;
        todo.limit = limit;
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

    /*public static async getRepository(): Promise<Repository> {
        const conn = await Store.createConnection();
        const todoRepository = conn.getRepository(ToDo);
        return todoRepository;
    }
    */
}
