import { createClient } from 'redis';

async function createConnection() {
  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
}

export const RedisProviders = [
  {
    provide: 'redis',
    useFactory: async () => {
      return await createConnection();
    },
  },
];
