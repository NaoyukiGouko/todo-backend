import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
//import { AppModule } from './../src/app.module';
import { TodoModule } from './../src/to-do/to-do/to-do.module';
//import { TodoService } from './../src/to-do/to-do/to-do.service';
import { Todo } from './../src/to-do/to-do';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Todo', () => {
  let app: INestApplication;
  //const todos: ToDo[] = [];
  //const todo: ToDo = null;
  //const i: number = null;
  //const todoService = {findAll: () => ['test'], delete: () => ['test'], create: () => ['test']};

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'admin',
        password: 'admin',
        database: 'testdb',
        entities: [Todo],
        synchronize: true,
      }), TodoModule],
    })
      .compile();

      app = moduleRef.createNestApplication();
      await app.init();

  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  });

  it('/POST create', () => {
    return request(app.getHttpServer())
      .post('/create')
      .expect(201)
  });

  it('/DELETE :id', () => {
    return request(app.getHttpServer())
      .delete('/:id')
      .expect(200)
  });

  afterEach(async () => {
    await app.close();
  });
  /**
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  
  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  */


});
