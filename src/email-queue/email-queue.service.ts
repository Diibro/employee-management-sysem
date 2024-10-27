import { Injectable } from '@nestjs/common';
import { CreateEmailQueueDto } from './dto/create-email-queue.dto';
import { UpdateEmailQueueDto } from './dto/update-email-queue.dto';

@Injectable()
export class EmailQueueService {
  create(createEmailQueueDto: CreateEmailQueueDto) {
    return 'This action adds a new emailQueue';
  }

  findAll() {
    return `This action returns all emailQueue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} emailQueue`;
  }

  update(id: number, updateEmailQueueDto: UpdateEmailQueueDto) {
    return `This action updates a #${id} emailQueue`;
  }

  remove(id: number) {
    return `This action removes a #${id} emailQueue`;
  }
}
