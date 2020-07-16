import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoService } from './to-do/to-do/to-do.service';
import { TodoModule } from './to-do/to-do/to-do.module';
import { Todo } from './to-do/to-do';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'admin',
      password: 'admin',
      database: 'testdb',
      entities: [Todo],
      synchronize: true,
    }),
    TodoModule],
  controllers: [AppController],
  providers: [AppService, TodoService],
})
export class AppModule {}
