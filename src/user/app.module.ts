// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'; // Assurez-vous que vous avez une entité User

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importez l'entité User ici
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Exportez le service si nécessaire dans d'autres modules
})
export class UserModule {}
