
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';
import { TAttendance } from 'src/util/types';
import { EmployeeService } from 'src/employee/employee.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AttendanceService {

  constructor(
    @InjectRepository(Attendance) 
    private readonly attendanceRepo: Repository<Attendance>,
    private employeeService: EmployeeService,
    @InjectQueue('email')
    private readonly emailQueue: Queue
  ){}
  async create(createAttendanceDto: CreateAttendanceDto) {
    try{
      const attendance = this.attendanceRepo.create(createAttendanceDto);
      const newAttendance = await this.attendanceRepo.save(attendance);
      if(newAttendance){
        await this.emailQueue.add({
          email: newAttendance.employee.email,
          subject: 'Attendance Recorded',
          content: 'Your attendance has been successfully recorded.',
        });
        return newAttendance;

      }else {
        return null;
      }
    }catch(error){
      return this.handleDbErrors(error);
    }
  }

  async findAll() {
    return await this.attendanceRepo.find();
  }

  async findByEmployee(email:string){
    return await this.employeeService.findByEmail(email, true);
  }

  async findByDate(date: Date) {
    return await this.attendanceRepo.find({where: {createdAt: date}})
  }

  async findByDateAndAction(date: Date, action: TAttendance) {
    return await this.attendanceRepo.find({where: {createdAt: date, action}})
  }

  handleDbErrors (error: any) {
    if (error instanceof QueryFailedError) {
      const dbErrorCode = (error as any).code;
      const errorMessage = (error as any).detail || ''; 

      switch (dbErrorCode) {
        case '23505':
          throw new BadRequestException('Attendance already recorded');
        case '23514':
          
          if (errorMessage.includes('action')) {
            throw new BadRequestException('attendance action cannot be null.');
          }
          else {
            throw new BadRequestException('A required field is missing.');
          }
        default:
          throw new BadRequestException('Database error occurred.');
      }
    }
    throw error;
  }
}
