import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { typeORMWriterConnection } from '@/database/extensions/typeorm.extension';
import { LogEntity } from './entities/transactional/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DatabaseService],
  imports: [typeORMWriterConnection, TypeOrmModule.forFeature([LogEntity])],
})
export class DatabaseModule {}
