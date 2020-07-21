import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './to-do.service';
import { TodoController } from  './to-do.controller';
import { Todo } from '../to-do';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  exports: [TypeOrmModule],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
