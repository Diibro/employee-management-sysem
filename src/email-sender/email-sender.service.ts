import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSenderService {

     constructor(
          private readonly mailerService: MailerService
     ) {}
     async sendWelcomeEmail (email:string, username:string) {
          try {
               await this.mailerService.sendMail({
                    to: email,
                    subject: `Welcome ${username}`,
                    template: './welcome',
                    context: {
                         username, 
                    },
               });

               return true;
          } catch (error) {
               console.log(error);
               return false
          }
          
     } 

     async sendPasswordCode(email:string, code:number){
          const htmlContent = `<h1>Password Reset</h1><p>Your reset code is: <strong>${code}</strong></p>`;

          try {
               await this.mailerService.sendMail({
                    to: email,
                    subject: `Password Reset`,
                    html: htmlContent, // Use the html property for HTML content
               });
      
              return true;
          } catch (error) {
              console.log(error);
              return false;
          }
     }
}
