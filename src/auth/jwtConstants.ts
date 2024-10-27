import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConstants {
     secret:string
     expiry: string

     constructor(configService:ConfigService){
          this.secret = configService.get<string>('JWT_SECRET')
          this.expiry = configService.get<string>('JWT_EXPIRY');
     }


}