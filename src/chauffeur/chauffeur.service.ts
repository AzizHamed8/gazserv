import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chauffeur } from './chauffeur.entity';
import { CreateChauffeurDto, UpdateChauffeurDto } from './chauffeur.dto';


@Injectable()
export class ChauffeurService {
  constructor(
    @InjectRepository(Chauffeur)
    private readonly chauffeurRepository: Repository<Chauffeur>,
  ) {}

  async create(createChauffeurDto: CreateChauffeurDto): Promise<Chauffeur> {
    const chauffeur = this.chauffeurRepository.create(createChauffeurDto);
    return await this.chauffeurRepository.save(chauffeur);
  }

  async findAll(): Promise<Chauffeur[]> {
    return await this.chauffeurRepository.find({ relations: ['programmes'] });
  }

  async findOne(id: number): Promise<Chauffeur> {
    return await this.chauffeurRepository.findOneBy({ id });
  }

  async update(id: number, updateChauffeurDto: UpdateChauffeurDto): Promise<Chauffeur> {
    await this.chauffeurRepository.update(id, updateChauffeurDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.chauffeurRepository.delete(id);
  }
}