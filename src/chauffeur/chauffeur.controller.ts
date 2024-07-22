import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ChauffeurService } from './chauffeur.service';
import { CreateChauffeurDto, UpdateChauffeurDto } from './chauffeur.dto';

@Controller('chauffeurs')
export class ChauffeurController {
  constructor(private readonly chauffeurService: ChauffeurService) {}

  @Post()
  async create(@Body() createChauffeurDto: CreateChauffeurDto) {
    return this.chauffeurService.create(createChauffeurDto);
  }

  @Get()
  async findAll() {
    return this.chauffeurService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.chauffeurService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateChauffeurDto: UpdateChauffeurDto) {
    return this.chauffeurService.update(id, updateChauffeurDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.chauffeurService.remove(id);
  }
}