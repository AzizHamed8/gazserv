// src/auth/auth.controller.ts
import { Controller, Post, Body ,Req, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // Vous pouvez faire des actions spécifiques pour la déconnexion ici si nécessaire.
    // Exemple : invalider un refresh token ou autre
    res.clearCookie('token'); // Exemple pour effacer un cookie
    res.status(200).send({ message: 'Logged out successfully' });
  }
}
