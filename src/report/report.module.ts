import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AttendanceModule } from 'src/attendance/attendance.module';

@Module({
  imports: [AttendanceModule],
  providers: [ReportService],
  controllers: [ReportController]
})
export class ReportModule {}
