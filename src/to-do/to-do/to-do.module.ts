import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToDoService } from './to-do.service';
import { ToDoController } from  './to-do.controller';
import { ToDo } from '../to-do';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  exports: [TypeOrmModule],
  providers: [ToDoService],
  controllers: [ToDoController]
})
export class ToDoModule {}
