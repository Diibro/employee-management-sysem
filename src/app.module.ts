import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { EmployeeModule } from './employee/employee.module';
import { AttendanceModule } from './attendance/attendance.module';
import { EmailQueueModule } from './email-queue/email-queue.module';
import { ReportModule } from './report/report.module';
import { AuthModule } from './auth/auth.module';
import { EmailSenderModule } from './email-sender/email-sender.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService:ConfigService) => ({
        type: 'postgres',
        host: ConfigService.get('DB_HOST'),
        port: +ConfigService.get('DB_PORT'),
        username: "postgres",
        password: ConfigService.get('DB_PASSWORD'),
        database: ConfigService.get('DB_NAME'),
        entities: [join(process.cwd(), "dist/**/*.entity.js")],
        synchronize: true
      })
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost', // Your Redis server host
        port: 6379,        // Your Redis server port
      },
    }),
    UserModule,
    EmployeeModule,
    AttendanceModule,
    EmailQueueModule,
    ReportModule,
    AuthModule,
    EmailSenderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
