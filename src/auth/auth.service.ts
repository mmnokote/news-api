import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneUser(username);
    if (user && user.password === password) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    try {
      const payload = { name: user.name, sub: user.id };
      const access_token = this.jwtService.sign(payload);
      const userx = user;
      userx.token = access_token;
      return userx;
    } catch (error) {
      // Handle errors here
      return { userx: null, message: 'Failed to login' };
    }
  }

  //   async login(user: any): Promise<{ user: any, message: string }> {
  //   try {
  //     const payload = { name: user.name, sub: user.id };
  //     const access_token = this.jwtService.sign(payload);
  //     const userWithToken = { ...user, token: access_token };
  //     return { user: userWithToken, message: 'Login successful' };
  //   } catch (error) {
  //     // Handle errors here
  //     return { user: null, message: 'Failed to login' };
  //   }
  // }

  //   async login(user: any): Promise<{ user: any, message: string }> {
  //   try {
  //     const payload = { name: user.name, sub: user.id };
  //     const access_token = this.jwtService.sign(payload);
  //     const userWithToken = { ...user, token: access_token };
  //     return { user: userWithToken, message: 'Login successful' };
  //   } catch (error) {
  //     // Handle errors here
  //     return { user: null, message: 'Failed to login' };
  //   }
  // }

  private readonly secretKey = 'SECRET'; // Replace with your actual secret key

  verifyToken(token: string): any {
    try {
      const decoded = jwt.verify(token, this.secretKey);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
