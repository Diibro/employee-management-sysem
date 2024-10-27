import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { EmailSenderModule } from 'src/email-sender/email-sender.module';

@Module({
  imports: [TypeOrmModule.forFeature([Employee, Attendance]), AuthModule, UserModule, EmailSenderModule],
  controllers: [EmployeeController],
  providers: [EmployeeService],
  exports: [EmployeeService]
})
export class EmployeeModule {}
