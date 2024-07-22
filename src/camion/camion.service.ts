import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camion } from './camion.entity';
import { CreateCamionDto, UpdateCamionDto } from './camion.dto';

@Injectable()
export class CamionService {
  constructor(
    @InjectRepository(Camion)
    private readonly camionRepository: Repository<Camion>,
  ) {}

  async create(createCamionDto: CreateCamionDto): Promise<Camion> {
    const camion = this.camionRepository.create(createCamionDto);
    return await this.camionRepository.save(camion);
  }

  async findAll(): Promise<Camion[]> {
    return await this.camionRepository.find({ relations: ['programmes'] });
  }

  async findOne(id: number): Promise<Camion> {
    return await this.camionRepository.findOneBy({ id });
  }

  async update(id: number, updateCamionDto: UpdateCamionDto): Promise<Camion> {
    await this.camionRepository.update(id, updateCamionDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.camionRepository.delete(id);
  }
}