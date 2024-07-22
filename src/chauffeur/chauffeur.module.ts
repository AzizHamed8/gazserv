import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChauffeurService } from './chauffeur.service';
import { ChauffeurController } from './chauffeur.controller';
import { Chauffeur } from './chauffeur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chauffeur])],
  providers: [ChauffeurService],
  controllers: [ChauffeurController],
})
export class ChauffeurModule {}