import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AthleteEligibilityService } from '../services/athlete-eligibility.service';
import { AthleteEligibility } from './athlete-eligibility.entity';

@Controller('athlete-eligibilities')
export class AthleteEligibilityController {
  constructor(private readonly athleteEligibilityService: AthleteEligibilityService) {}

  @Post()
  async create(@Body() athleteEligibilityData: Partial<AthleteEligibility>): Promise<AthleteEligibility> {
    return this.athleteEligibilityService.create(athleteEligibilityData);
  }

  @Get()
  async findAll(): Promise<AthleteEligibility[]> {
    return this.athleteEligibilityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AthleteEligibility> {
    return this.athleteEligibilityService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<AthleteEligibility>): Promise<AthleteEligibility> {
    return this.athleteEligibilityService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.athleteEligibilityService.remove(id);
  }
}