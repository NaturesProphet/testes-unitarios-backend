import { Module } from '@nestjs/common';
import { RequestsModule } from './requests/requests.module';
import { RedisModule } from './redis/redis.module';
import { DatabaseModule } from './database/database.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RequestsModule, RedisModule, DatabaseModule, RabbitmqModule],
})
export class AppModule {}
