import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmailQueueService } from './email-queue.service';
import { CreateEmailQueueDto } from './dto/create-email-queue.dto';
import { UpdateEmailQueueDto } from './dto/update-email-queue.dto';

@Controller('email-queue')
export class EmailQueueController {
  constructor(private readonly emailQueueService: EmailQueueService) {}

  @Post()
  create(@Body() createEmailQueueDto: CreateEmailQueueDto) {
    return this.emailQueueService.create(createEmailQueueDto);
  }

  @Get()
  findAll() {
    return this.emailQueueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailQueueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmailQueueDto: UpdateEmailQueueDto) {
    return this.emailQueueService.update(+id, updateEmailQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailQueueService.remove(+id);
  }
}
