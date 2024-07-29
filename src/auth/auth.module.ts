// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/app.module'; // Assurez-vous que UserModule est importé
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy'; // Assurez-vous que JwtStrategy est défini

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret_key', // Utilisez une clé secrète appropriée
      signOptions: { expiresIn: '60m' }, // Durée de validité du token
    }),
    UserModule, // Importez UserModule si AuthService utilise UserService
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
