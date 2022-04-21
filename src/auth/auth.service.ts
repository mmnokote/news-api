import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    // return user;

    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }
    throw new UnauthorizedException();
  }

  async login(user: any) {
    const payload = { name: user.first_name, email: user.email };

    return { access_token: this.jwtService.sign(payload) };
  }
}
