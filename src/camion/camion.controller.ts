import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CamionService } from './camion.service';
import { CreateCamionDto, UpdateCamionDto } from './camion.dto';

@Controller('camions')
export class CamionController {
  constructor(private readonly camionService: CamionService) {}

  @Post()
  async create(@Body() createCamionDto: CreateCamionDto) {
    return this.camionService.create(createCamionDto);
  }

  @Get()
  async findAll() {
    return this.camionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.camionService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateCamionDto: UpdateCamionDto) {
    return this.camionService.update(id, updateCamionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.camionService.remove(id);
  }
}