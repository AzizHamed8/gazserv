import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userService.findOneByLogin(loginDto.login);
    if (!user || user.password !== loginDto.password) {
      throw new Error('Invalid credentials');
    }
    const payload = { login: user.login };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
