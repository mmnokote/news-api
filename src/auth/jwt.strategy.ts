import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET', ///move to .env
    });
  }
  async validate(payload: any) {
    //const user =await this.userService.getById(payload.id);
    return {
      email: payload.email,
      name: payload.first_name,
    };
  }
}
