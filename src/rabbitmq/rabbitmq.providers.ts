import { Logger } from '@nestjs/common';
import { connect } from 'amqplib';

async function createConnection() {
  const logger = new Logger(' RabbitMQ ');
  try {
    const conn = await connect({
      hostname: process.env.RABBITMQ_HOST_NAME,
      port: parseInt(process.env.RABBITMQ_HOST_PORT),
      username: process.env.RABBITMQ_USER,
      password: process.env.RABBITMQ_PASSWORD,
    });
    logger.log('RabbitMQ conectado.');
    return conn;
  } catch (err) {
    logger.error(
      `Erro ao tentar se conectar ao RabbitMQ. ${err.message}  `,
      err,
    );
    process.exit(-1);
  }
}

export const RabbitMQProvider = [
  {
    provide: 'rabbitmq',
    useFactory: async () => {
      return createConnection();
    },
  },
];
