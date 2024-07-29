import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Programme } from './programme.entity';
import { ProgrammeService } from './programme.service';
import { ProgrammeController } from './programme.controller';
import { Chauffeur } from '../chauffeur/chauffeur.entity';
import { Camion } from '../camion/camion.entity';
import { Client } from '../client/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Programme, Chauffeur, Camion, Client]),
  ],
  controllers: [ProgrammeController],
  providers: [ProgrammeService],
  exports: [ProgrammeService],
})
export class ProgrammeModule {}
