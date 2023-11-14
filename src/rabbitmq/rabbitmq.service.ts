import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'amqplib';

@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('rabbitmq')
    private readonly conn: Connection,
  ) {}

  async consomeFila(queue: string) {
    const ch = await this.conn.createChannel();
    await ch.assertQueue(queue);
    ch.consume(queue, (msg) => {
      console.log(msg.content.toString());
      ch.ack(msg);
    });
  }

  async publica(msg: string, queue: string) {
    const ch = await this.conn.createChannel();
    await ch.assertQueue(queue);
    ch.sendToQueue(queue, Buffer.from(msg));
    await ch.close();
  }
}
