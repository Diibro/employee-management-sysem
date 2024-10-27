import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendance } from './entities/attendance.entity';
import { EmployeeModule } from 'src/employee/employee.module';
import { Employee } from 'src/employee/entities/employee.entity';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance,Employee]), EmployeeModule, EmailSenderModule, 
  BullModule.registerQueue({
    name: 'email', 
  }),
],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService]
})
export class AttendanceModule {}
