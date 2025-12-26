import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AthleteService } from '../services/athlete.service';
import { Athlete } from './athlete.entity';

@Controller('athletes')
export class AthleteController {
  constructor(private readonly athleteService: AthleteService) {}

  @Post()
  async create(@Body() athleteData: Partial<Athlete>): Promise<Athlete> {
    return this.athleteService.create(athleteData);
  }

  @Get()
  async findAll(): Promise<Athlete[]> {
    return this.athleteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Athlete> {
    return this.athleteService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Athlete>): Promise<Athlete> {
    return this.athleteService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.athleteService.remove(id);
  }
}