import { TypeOrmModule } from '@nestjs/typeorm';
import { LogEntity } from '../entities/transactional/log.entity';

export const typeORMWriterConnection = TypeOrmModule.forRoot({
  name: 'default',
  type: 'mysql',
  host: process.env.MYSQL_W_HOST_NAME,
  port: +process.env.MYSQL_W_HOST_PORT,
  username: process.env.MYSQL_W_USER,
  password: process.env.MYSQL_W_PASSWORD,
  database: 'teste',
  entities: [LogEntity],
  synchronize: false,
  timezone: 'Z',
  logging: ['test', 'test:dev'].includes(process.env.NODE_ENV) ? true : false,
  extra: {
    acquireTimeout: +process.env.POOL_ACQUIRE_TIMEOUT || 10000,
    waitForConnections: process.env.POOL_WAIT_FOR_CONNECTIONS || false,
    connectionLimit: +process.env.POOL_CONNECTION_LIMIT || 20,
    queueLimit: +process.env.POOL_QUEUE_LIMIT || 0,
  },
});
