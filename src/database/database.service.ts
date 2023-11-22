import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LogEntity } from './entities/transactional/log.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DatabaseService {
  @InjectRepository(LogEntity)
  private readonly repository: Repository<LogEntity>;

  async getLog(id: string) {
    let log: LogEntity;
    try {
      log = await this.repository.findOne({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException();
    }
    if (log) {
      return log.atributos;
    }
    return null;
  }
}
