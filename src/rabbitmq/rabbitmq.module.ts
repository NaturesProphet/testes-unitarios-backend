import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQProvider } from './rabbitmq.providers';

@Module({
  providers: [RabbitMQService, ...RabbitMQProvider],
})
export class RabbitmqModule {}
