import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programme } from './programme.entity';
import { CreateProgrammeDto, UpdateProgrammeDto } from './programme.dto';

@Injectable()
export class ProgrammeService {
    constructor(
      @InjectRepository(Programme)
      private readonly programmeRepository: Repository<Programme>,
    ) {}
  
    async findAll(): Promise<Programme[]> {
      return this.programmeRepository.find({
        relations: ['chauffeur', 'camion', 'clients'],
      });
    }
  
    async create(createProgrammeDto: CreateProgrammeDto): Promise<Programme> {
      const programme = this.programmeRepository.create(createProgrammeDto);
      return this.programmeRepository.save(programme);
    }

  async findOne(id: number): Promise<Programme> {
    return await this.programmeRepository.findOneBy({ id });
  }

  async update(id: number, updateProgrammeDto: UpdateProgrammeDto): Promise<Programme> {
    await this.programmeRepository.update(id, updateProgrammeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.programmeRepository.delete(id);
  }
}