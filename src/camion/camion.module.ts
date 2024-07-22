import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CamionService } from './camion.service';
import { CamionController } from './camion.controller';
import { Camion } from './camion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Camion])],
  providers: [CamionService],
  controllers: [CamionController],
})
export class CamionModule {}