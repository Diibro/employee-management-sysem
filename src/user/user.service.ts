import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { QueryFailedError, Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepo.create(createUserDto);
      return await this.userRepo.save(newUser);
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async findAll() {
    try {
      return await this.userRepo.find();
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.userRepo.findOne({where: {id}});
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async findByEmail(email:string){
    try {
      return await this.userRepo.findOne({where: {email}});
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepo.findOne({where: {id}});
      if(!user) return new NotFoundException("User not found");
      Object.assign(user, updateUserDto);
      return await this.userRepo.save(user);
    } catch (error) {
      return this.handleDbErrors(error);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepo.findOne({where: {id}});
      if(!user) return new NotFoundException("User not found");
      return await this.userRepo.remove(user);
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
          throw new BadRequestException('User with the same name already exists.');
        case '23514':
          
          if (errorMessage.includes('email')) {
            throw new BadRequestException('User email cannot be null.');
          }
          else if(errorMessage.includes('password')){
            throw new BadRequestException("User password cannot be null")
          }
          else if (constraint) {
            switch(constraint){
              case 'EMPTY_EMAIL_CHECK':
                throw new BadRequestException('User email cannot be empty');
              case 'EMPTY_PASSWORD_CHECK':
                throw new BadRequestException('User password cannot be empty');
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
