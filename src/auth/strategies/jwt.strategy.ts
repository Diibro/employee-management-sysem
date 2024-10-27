import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtConstants } from "../jwtConstants";

@Injectable()
export class JWtStrategy extends PassportStrategy(Strategy){
     constructor(
          private jwtConstants: JwtConstants
      ) {
          super({
               jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
               ignoreExpiration: false,
               secretOrKey:jwtConstants.secret,
          });
     }
     
     async validate(payload: any) {
     return { userId: payload.sub, email: payload.email };
     }
}