import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('redis')
    private readonly client: RedisClientType,
  ) {}

  async set(key: string, value: any, expire: number) {
    await this.client.set(key, value);
    await this.client.expire(key, expire);
  }

  async get(key: string) {
    return await this.client.get(key);
  }
}
