import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';

// Mock do RedisClientType
const mockRedisClient = {
  set: jest.fn(),
  expire: jest.fn(),
  get: jest.fn(),
};

describe('RedisService', () => {
  let service: RedisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          provide: 'redis',
          useValue: mockRedisClient,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
  });

  it('A classe deve estar instanciada', () => {
    expect(service).toBeDefined();
  });

  describe('set', () => {
    it('Deve registrar uma chave, um valor e um tempo de expiração no Redis', async () => {
      const key = 'testKey';
      const value = 'testValue';
      const expire = 3600; // 1 hora

      await service.set(key, value, expire);

      expect(mockRedisClient.set).toHaveBeenCalledWith(key, value);
      expect(mockRedisClient.expire).toHaveBeenCalledWith(key, expire);
    });
  });

  describe('get', () => {
    it('Deve retornar um registro no redis pela chave.', async () => {
      const key = 'testKey';
      const mockValue = 'mockValue';

      mockRedisClient.get.mockResolvedValue(mockValue);

      const result = await service.get(key);

      expect(result).toEqual(mockValue);
      expect(mockRedisClient.get).toHaveBeenCalledWith(key);
    });
  });
});
