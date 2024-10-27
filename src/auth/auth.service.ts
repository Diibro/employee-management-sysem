import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs';
import { EUserRole } from 'src/util/enums';
import { EmailSenderService } from 'src/email-sender/email-sender.service';
import { IResetCode } from 'src/util/interfaces';
import { CResponse } from 'src/util/customClasses';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class AuthService {
     private resetCodes:Array<IResetCode> = new Array<IResetCode>()
     constructor(
          private userService: UserService,
          private jwtService: JwtService,
          private emailSender: EmailSenderService,
          
     ){}

     

     async register(email:string, password: string, name:string, role:EUserRole) {
          const hashedPassword = await bcrypt.hash(password, 10);
          return this.userService.create({email, password:hashedPassword,name,role});
     }

     async validateUser(email:string, pass:string) :Promise<any> {
          const user = await this.userService.findByEmail(email);
          if(user && (await bcrypt.compare(pass, user.password))){
               const {password, ...result} = user;
               return result;
          }
          return null;
     }

     async login(user:any){
          const payload = {email:user.email, sub:user.id};
          return {
               acces_token: this.jwtService.sign(payload),
          }
     }

     async getForgetPasswordCode(email: string) {
          try {
               const resetCode = Math.floor(Math.random() * 1000000);
               const emailSent = await this.emailSender.sendPasswordCode(email,resetCode);
               if(emailSent) {
                    this.resetCodes.push({email: email, code: resetCode, expireAt: Date.now() + 15 * 60 * 1000})
                    return {message: 'Check your email for the reset code'}
               }else {
                    return {message: "Error sending you reset code. You can other options to reset your password"}
               }
          } catch (error) {
               console.log(error);
               return {message: "error generating a reset code.", status:false}
          }
          

     }

     async checkResetCode (code:number, email:string) {
          const resetCode:IResetCode = this.resetCodes.find(cd => cd.code === code && cd.email === email);
          if(!resetCode){
               return new CResponse(false, 'Invalid code').getObject();
          }
          else if(resetCode.expireAt > Date.now()){
               return new CResponse(false, 'Code Expired')
          } 
          const payload = {email:email, sub:resetCode};
          return {
               acces_token: this.jwtService.sign(payload),
          }
     }

     async changePassword (email:string, password:string){
          const user = await this.userService.findByEmail(email);
          if(user){
               const hashedPassword = await bcrypt.hash(password, 10);
               const updatedUser:UpdateUserDto = {...user, password: hashedPassword};
               return this.userService.update(user.id,updatedUser);
          }

     }
}
