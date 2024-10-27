import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('email')
@Injectable()
export class EmailProcessor {
     constructor(private readonly mailerService: MailerService) {}

     @Process()
     async sendEmail(job: Job) {
     const { email, subject, content } = job.data;

     await this.mailerService.sendMail({
          to: email,
          subject: subject,
          template: './',
          context: {
          content,
          },
     });
     }
}