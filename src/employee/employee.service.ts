import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { EUserRole } from 'src/util/enums';
import { EmailSenderService } from 'src/email-sender/email-sender.service';

@Injectable()
export class EmployeeService {

  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepo: Repository<Employee>,
    private authService: AuthService,
    private emailSender: EmailSenderService
  ){}
  async create(createEmployeeDto: CreateEmployeeDto) {
    try {
      const employee = this.employeeRepo.create(createEmployeeDto);
      const savedEmployee = await this.employeeRepo.save(employee);
      if(savedEmployee){
        const {email, name} = savedEmployee;
        const {loginPassword} = createEmployeeDto;
        const newUser = await this.authService.register(email, loginPassword, name, EUserRole.EMPLOYEE);
        if(newUser){
          await this.emailSender.sendWelcomeEmail(newUser.email, newUser.name)
          return {message: "new employee registered.", data: {savedEmployee}, loginData: {email: savedEmployee.email, password: loginPassword} }
        }
      }
    return null;
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.employeeRepo.find();
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.employeeRepo.findOne({where: {employeeIdentifier: id}});
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async findByEmail (email:string, fetchAttendances?:boolean){
    const employee = await this.employeeRepo.findOne({where: {email}});
    if(fetchAttendances){
      const attendances = await employee.attendances;
      return {employee, attendances};
    }
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    try {
      const employeeFound = await this.employeeRepo.findOne({where: {employeeIdentifier: id}});
      if(!employeeFound) throw new NotFoundException("Employee not found");
      Object.assign(employeeFound, updateEmployeeDto);
      return await this.employeeRepo.save(employeeFound);
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const employeeFound = await this.employeeRepo.findOne({where: {employeeIdentifier: id}});
      if(!employeeFound) throw new NotFoundException("Employee not found");
      return await this.employeeRepo.remove(employeeFound);
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  private handleDbErrors(error: any): void {
    if (error instanceof QueryFailedError) {
      const dbErrorCode = (error as any).code;
      const errorMessage = (error as any).detail || ''; 
      const constraint = (error as any).constraint;

      switch (dbErrorCode) {
        case '23505':
          throw new BadRequestException('Employee with the same email already exists.');
        case '23514':
          
          if (errorMessage.includes('email')) {
            throw new BadRequestException('Employee email cannot be null.');
          }
          else if(errorMessage.includes('name')){
            throw new BadRequestException("Employee names cannot be null")
          }
          else if (constraint) {
            switch(constraint){
              case 'EMPTY_EMAIL_CHECK':
                throw new BadRequestException('User email cannot be empty');
              case 'EMPTY_NAME_CHECK':
                throw new BadRequestException('Employee names cannot be empty');
              }
          }else {
            throw new BadRequestException('A required field is missing.');
          }
        default:
          throw new BadRequestException('Database error occurred.');
      }
    }
    throw error;
  }
}
