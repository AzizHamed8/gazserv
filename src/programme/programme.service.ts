import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Programme } from './programme.entity';
import { CreateProgrammeDto, UpdateProgrammeDto } from './programme.dto';
import { Chauffeur } from '../chauffeur/chauffeur.entity';
import { Camion } from '../camion/camion.entity';
import { Client } from '../client/client.entity';

@Injectable()
export class ProgrammeService {
  constructor(
    @InjectRepository(Programme)
    private readonly programmeRepository: Repository<Programme>,

    @InjectRepository(Chauffeur)
    private readonly chauffeurRepository: Repository<Chauffeur>,

    @InjectRepository(Camion)
    private readonly camionRepository: Repository<Camion>,

    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  async findAll(): Promise<Programme[]> {
    return this.programmeRepository.find({
      relations: ['chauffeur', 'camion', 'clients'],
    });
  }

  async create(createProgrammeDto: CreateProgrammeDto): Promise<Programme> {
    const { chauffeurId, camionId, clientIds, ...programmeData } = createProgrammeDto;

    const chauffeur = await this.chauffeurRepository.findOneBy({ id: chauffeurId });
    const camion = await this.camionRepository.findOneBy({ id: camionId });
    const clients = clientIds ? await this.clientRepository.findByIds(clientIds) : [];

    if (!chauffeur || !camion) {
      throw new NotFoundException('Chauffeur or Camion not found');
    }

    const programme = this.programmeRepository.create({
      ...programmeData,
      chauffeur,
      camion,
      clients,
    });

    return this.programmeRepository.save(programme);
  }

  async findOne(id: number): Promise<Programme> {
    const programme = await this.programmeRepository.findOne({
      where: { id },
      relations: ['chauffeur', 'camion', 'clients'],
    });

    if (!programme) {
      throw new NotFoundException(`Programme with id ${id} not found`);
    }

    return programme;
  }

  async update(id: number, updateProgrammeDto: UpdateProgrammeDto): Promise<Programme> {
    const { chauffeurId, camionId, clientIds, ...programmeData } = updateProgrammeDto;

    const chauffeur = chauffeurId ? await this.chauffeurRepository.findOneBy({ id: chauffeurId }) : null;
    const camion = camionId ? await this.camionRepository.findOneBy({ id: camionId }) : null;
    const clients = clientIds ? await this.clientRepository.findByIds(clientIds) : [];

    if (chauffeurId && !chauffeur) {
      throw new NotFoundException('Chauffeur not found');
    }

    if (camionId && !camion) {
      throw new NotFoundException('Camion not found');
    }

    // Check if the programme exists
    const existingProgramme = await this.programmeRepository.findOne({
      where: { id },
      relations: ['chauffeur', 'camion', 'clients'],
    });

    if (!existingProgramme) {
      throw new NotFoundException(`Programme with id ${id} not found`);
    }

    // Update the programme
    if (chauffeur) existingProgramme.chauffeur = chauffeur;
    if (camion) existingProgramme.camion = camion;
    if (clientIds) existingProgramme.clients = clients;
    
    // Update other properties
    Object.assign(existingProgramme, programmeData);

    return this.programmeRepository.save(existingProgramme);
  }

  async remove(id: number): Promise<void> {
    const result = await this.programmeRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Programme with id ${id} not found`);
    }
  }
}
