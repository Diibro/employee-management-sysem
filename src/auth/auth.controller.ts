import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
     constructor(
          private authService:AuthService
     ) {}

     @Post('register')
     register(@Body() body: any) {
          const { email, password, name, role } = body;
          return this.authService.register(email, password, name, role);
     }

     @UseGuards(LocalAuthGuard)
     @Post('login')
     login(@Request() req) {
          console.log(req.user)
          if(req.user) return this.authService.login(req.user)
     }

     @UseGuards(JwtAuthGuard)
     @Post('logout')
     logout(@Request() req){
          return req.logout();
     }

     @UseGuards(JwtAuthGuard)
     @Get('profile')
     getUseInfo(@Request() req){
          return req.user;
     }

     @Get('forgot-password')
     forgotPassword(@Query('email') email:string) {
          return this.authService.getForgetPasswordCode(email);
     }


     @Get('check-reset-code')
     checkPasswordResetCode(@Query('code') code:number, @Query('email') email:string) {
          return this.authService.checkResetCode(code, email);
     }


     @UseGuards(JwtAuthGuard)
     @Post('reset-password')
     resetPassword (@Body() body:any, @Request() req){
          const user = req.user;
          return this.authService.changePassword(user.email, body.password)
     }
}
