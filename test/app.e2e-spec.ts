import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Connection } from 'typeorm';
import { TodoModule } from './../src/to-do/to-do/to-do.module';
import { Todo } from './../src/to-do/to-do';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Todo', () => {
  let app: INestApplication;
  let connection: Connection;

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
      connection = app.get(Connection);

  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
    .get('/')
    .expect(200)
  });

  it('todoを登録することができるか', async () => {
    const res = await request(app.getHttpServer())
    .post('/create')
    .type('json')
    .send({title: "test"})
    .expect(201);

    const resBody = {
      title: res.body.title,
      id: res.body.id,
      limit: res.body.limit,
      createAt: new Date(res.body.createAt),
      updateAt: new Date(res.body.updateAt)
    }

    const newTodo = await connection.manager
    .createQueryBuilder(Todo, 'todo')
    .orderBy('todo.id', 'DESC').getOne();
    
    expect(resBody).toMatchObject(newTodo);
  });

  it('上記テストで登録したtodoを削除できるか', async () => {
    const deleteTodo = await connection.manager
    .createQueryBuilder(Todo, 'todo')
    .orderBy('todo.id', "DESC").getOne();

    await request(app.getHttpServer())
    .delete(`/${deleteTodo.id}`)
    .expect(200);

    const testTodo = await connection.manager
    .createQueryBuilder(Todo, 'todo')
    .where(`todo.id = ${deleteTodo.id}`).getOne();

    expect(testTodo).toBeFalsy();
  });



  afterEach(async () => {
    await app.close();
  });
});
