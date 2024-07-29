import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/user.service'; // Assurez-vous que le chemin est correct

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'default_secret_key', // Utilisez la clé secrète
    });
  }

  async validate(payload: any) {
    const { login } = payload;
    const user = await this.userService.findOneByLogin(login);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
