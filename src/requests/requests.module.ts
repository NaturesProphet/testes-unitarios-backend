import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  providers: [RequestsModule],
  imports: [HttpModule],
})
export class RequestsModule {}
