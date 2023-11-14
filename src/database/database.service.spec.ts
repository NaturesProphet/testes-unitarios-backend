import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { LogEntity } from './entities/transactional/log.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let repository: Repository<LogEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: getRepositoryToken(LogEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
    repository = module.get<Repository<LogEntity>>(
      getRepositoryToken(LogEntity),
    );
  });

  it('A classe deve estar instanciada', () => {
    expect(service).toBeDefined();
  });

  describe('getLog', () => {
    it('Se o log for encontrado, deve retornar seus atributos', async () => {
      const mockLogId = 'f1cd5a22-8ee8-485d-903a-020c40bdd913';
      const mockLogEntity = new LogEntity();
      mockLogEntity.atributos = { chave: 'valor' };

      jest.spyOn(repository, 'findOne').mockResolvedValue(mockLogEntity);

      const result = await service.getLog(mockLogId);

      expect(result).toEqual({ chave: 'valor' });
    });

    it('Deve retornar null se o log não for encontrado.', async () => {
      const mockLogId = 'nonexistentLogId';

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      const result = await service.getLog(mockLogId);

      expect(result).toBeNull();
    });

    it('Deve cospir um 500 se o select falhar', async () => {
      const mockLogId = 'mockLogId';

      jest.spyOn(repository, 'findOne').mockRejectedValue(new Error());

      await expect(service.getLog(mockLogId)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
