import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProgrammeService } from './programme.service';
import { CreateProgrammeDto, UpdateProgrammeDto } from './programme.dto';

@Controller('programmes')
export class ProgrammeController {
  constructor(private readonly programmeService: ProgrammeService) {}

  @Get()
  async findAll() {
    return this.programmeService.findAll();
  }

  @Post()
  async create(@Body() createProgrammeDto: CreateProgrammeDto) {
    return this.programmeService.create(createProgrammeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.programmeService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateProgrammeDto: UpdateProgrammeDto) {
    return this.programmeService.update(id, updateProgrammeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.programmeService.remove(id);
  }
}