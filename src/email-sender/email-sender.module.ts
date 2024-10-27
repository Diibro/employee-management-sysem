import { Module } from '@nestjs/common';
import { EmailSenderService } from './email-sender.service';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: 587,
          secure: false, 
          auth: {
            user: configService.get('SENDER_EMAIL'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: `"Employee management System" ${configService.get('SENDER_EMAIL')}`,
        },
        template: {
          dir: join(__dirname, '../src/email-sender/templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService]
    }),
  ],
  providers: [EmailSenderService, ConfigService],
  exports: [EmailSenderService]
})
export class EmailSenderModule {}
