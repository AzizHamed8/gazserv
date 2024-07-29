import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, HttpCode, HttpStatus } from '@nestjs/common';
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
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createProgrammeDto: CreateProgrammeDto) {
    return this.programmeService.create(createProgrammeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.programmeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Param('id') id: number, @Body() updateProgrammeDto: UpdateProgrammeDto) {
    return this.programmeService.update(id, updateProgrammeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: number) {
    await this.programmeService.remove(id);
  }

  
}
