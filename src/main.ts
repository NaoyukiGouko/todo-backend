import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { createConnection, ConnectionOptions, Connection} from 'typeorm';
//import { ToDo } from './to-do/to-do';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
  
/*export class Store {
  public static _conn: Connection;

  public static connectionOptions: ConnectionOptions = {
    type: "postgres",
    host: "localhost",
    port: 5433,
    username: "admin",
    password: "admin",
    database: "testdb",
    entities: [
        ToDo
    ],
    synchronize: true,
    logging: false
  }

  public static async createConnection(): Promise<Connection> {
    if(!this._conn){
      this._conn = await createConnection(this.connectionOptions);
    }
    return this._conn;
  }
}
*/