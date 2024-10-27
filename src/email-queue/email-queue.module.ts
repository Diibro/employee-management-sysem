import { Module } from '@nestjs/common';
import { EmailQueueService } from './email-queue.service';
import { EmailQueueController } from './email-queue.controller';

@Module({
  controllers: [EmailQueueController],
  providers: [EmailQueueService],
})
export class EmailQueueModule {}
